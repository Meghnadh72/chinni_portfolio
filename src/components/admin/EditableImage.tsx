"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/components/providers/AdminProvider";
import { Camera, Check, AlertTriangle } from "lucide-react";

interface EditableImageProps {
  table: string;
  rowId: string;
  column: string;
  value: string;
  folder?: string;
  children: React.ReactNode;
}

const MIN_WIDTH = 800;
const COMPRESS_THRESHOLD = 5 * 1024 * 1024;
const COMPRESS_QUALITY = 0.8;
const COMPRESS_MAX_DIM = 2400;

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.onload = () => {
      let { width, height } = img;
      if (width > COMPRESS_MAX_DIM || height > COMPRESS_MAX_DIM) {
        const ratio = Math.min(COMPRESS_MAX_DIM / width, COMPRESS_MAX_DIM / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), { type: "image/jpeg" }));
          else resolve(file);
        },
        "image/jpeg",
        COMPRESS_QUALITY
      );
    };
    img.src = URL.createObjectURL(file);
  });
}

export default function EditableImage({
  table,
  rowId,
  column,
  value: _value,
  folder = "projects",
  children,
}: EditableImageProps) {
  const { isAdmin } = useAdmin();
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [warning, setWarning] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!isAdmin) return <>{children}</>;

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setWarning("");

    const dims = await new Promise<{ width: number; height: number }>((resolve) => {
      const img = document.createElement("img");
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => resolve({ width: 0, height: 0 });
      img.src = URL.createObjectURL(file);
    });

    if (dims.width > 0 && dims.width < MIN_WIDTH) {
      setWarning(`Image is ${dims.width}px wide — may look blurry`);
    }

    let processedFile = file;
    if (file.size > COMPRESS_THRESHOLD) {
      processedFile = await compressImage(file);
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", processedFile);
    formData.append("folder", folder);

    try {
      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadRes.ok) {
        const { url } = await uploadRes.json();
        await fetch("/api/admin/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table, rowId, column, value: url }),
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        router.refresh();
      } else {
        const { error } = await uploadRes.json();
        setWarning(error || "Upload failed");
      }
    } catch {
      setWarning("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="group relative">
      {children}

      <div
        className="absolute inset-0 z-30 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
      >
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm shadow-lg">
          <Camera className="w-4 h-4" />
          Change Image
        </div>
      </div>

      {uploading && (
        <div className="absolute inset-0 z-40 bg-black/50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm">Uploading...</p>
          </div>
        </div>
      )}

      {saved && (
        <div className="absolute top-4 left-4 z-40 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <Check className="w-3 h-3" /> Image updated
        </div>
      )}

      {warning && (
        <div className="absolute bottom-4 left-4 z-40 bg-amber-500/90 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
          <AlertTriangle className="w-3 h-3" /> {warning}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
        className="hidden"
      />
    </div>
  );
}
