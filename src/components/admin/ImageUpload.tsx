"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, AlertTriangle, Check } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  aspectRatio?: string;
  className?: string;
  label?: string;
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

export default function ImageUpload({
  value,
  onChange,
  folder = "projects",
  aspectRatio = "aspect-video",
  className = "",
  label,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [warning, setWarning] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setWarning("");
    setUploaded(false);

    const dims = await new Promise<{ width: number; height: number }>((resolve) => {
      const img = document.createElement("img");
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => resolve({ width: 0, height: 0 });
      img.src = URL.createObjectURL(file);
    });

    if (dims.width > 0 && dims.width < MIN_WIDTH) {
      setWarning(`Image is ${dims.width}px wide — recommend ${MIN_WIDTH}px+`);
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
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const { url } = await res.json();
        onChange(url);
        setUploaded(true);
        setTimeout(() => setUploaded(false), 3000);
      } else {
        const { error } = await res.json();
        setWarning(error || "Upload failed");
      }
    } catch {
      setWarning("Upload failed — check connection");
    } finally {
      setUploading(false);
    }
  }, [folder, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    }
  }, [handleFile]);

  return (
    <div className={className}>
      {label && (
        <label className="text-xs text-[var(--muted-foreground)] mb-1 block">{label}</label>
      )}

      <div
        className={`relative ${aspectRatio} rounded-sm overflow-hidden border-2 transition-all cursor-pointer ${
          dragOver
            ? "border-[var(--accent)] bg-[var(--accent)]/10"
            : value
            ? "border-[var(--border)]"
            : "border-dashed border-[var(--border)] hover:border-[var(--accent)]/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        {value ? (
          <>
            <Image src={value} alt="Preview" fill className="object-cover" sizes="600px" />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="text-white text-center">
                <Upload className="w-6 h-6 mx-auto mb-1" />
                <p className="text-xs">Click or drop to replace</p>
              </div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onChange(""); }}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--muted-foreground)]">
            <Upload className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">Click or drag image here</p>
            <p className="text-xs opacity-60 mt-1">JPEG, PNG, WebP · Max 10MB</p>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs">Uploading...</p>
            </div>
          </div>
        )}

        {uploaded && !uploading && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" /> Uploaded
          </div>
        )}
      </div>

      {warning && (
        <div className="flex items-start gap-1.5 mt-1.5 text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p className="text-xs">{warning}</p>
        </div>
      )}

      <div className="mt-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL..."
          className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-1.5 text-xs focus:border-[var(--accent)] focus:outline-none text-[var(--muted-foreground)]"
        />
      </div>

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
