"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/components/providers/AdminProvider";

interface EditableFieldProps {
  table: string;
  rowId: string;
  column: string;
  value: string;
  multiline?: boolean;
  children: React.ReactNode;
}

export default function EditableField({
  table,
  rowId,
  column,
  value,
  multiline = false,
  children,
}: EditableFieldProps) {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const router = useRouter();

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  if (!isAdmin) return <>{children}</>;

  const save = async () => {
    if (draft === value) {
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table, rowId, column, value: draft }),
      });

      if (res.ok) {
        setSaved(true);
        setEditing(false);
        setTimeout(() => setSaved(false), 2000);
        router.refresh();
      }
    } catch {
      // Silently fail
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      save();
    }
    if (e.key === "Escape") {
      setDraft(value);
      setEditing(false);
    }
  };

  if (editing) {
    return (
      <div className="relative inline-block w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={4}
            className="w-full bg-[var(--card)] border-2 border-[var(--accent)] rounded-sm px-3 py-2 text-[var(--foreground)] text-sm focus:outline-none resize-y"
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[var(--card)] border-2 border-[var(--accent)] rounded-sm px-3 py-2 text-[var(--foreground)] text-sm focus:outline-none"
          />
        )}
        <div className="flex gap-1 mt-1">
          <button
            onClick={save}
            disabled={saving}
            className="px-3 py-1 bg-[var(--accent)] text-white text-xs rounded-sm hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={() => { setDraft(value); setEditing(false); }}
            className="px-3 py-1 bg-[var(--muted)] text-[var(--foreground)] text-xs rounded-sm hover:opacity-80"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => setEditing(true)}
    >
      <div className="group-hover:outline group-hover:outline-2 group-hover:outline-dashed group-hover:outline-[var(--accent)]/50 group-hover:rounded-sm transition-all">
        {children}
      </div>
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--accent)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      </div>
      {saved && (
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
          Saved
        </span>
      )}
    </div>
  );
}
