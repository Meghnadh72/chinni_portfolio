"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/components/providers/AdminProvider";
import { Plus, Trash2, X } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
}

const MAX_ACHIEVEMENTS = 4;

export default function AchievementsEditor({
  achievements,
  children,
}: {
  achievements: Achievement[];
  children: React.ReactNode;
}) {
  const { isAdmin } = useAdmin();
  const [editing, setEditing] = useState(false);
  const [items, setItems] = useState<Achievement[]>(achievements);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  if (!isAdmin) return <>{children}</>;

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "cp_photographer",
          rowId: "main",
          column: "achievements",
          value: items,
        }),
      });
      if (res.ok) {
        setEditing(false);
        router.refresh();
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  const updateItem = (index: number, field: keyof Achievement, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    if (items.length >= MAX_ACHIEVEMENTS) return;
    setItems([...items, { title: "0", description: "New Achievement" }]);
  };

  if (editing) {
    return (
      <div className="col-span-full bg-[var(--card)] border-2 border-[var(--accent)] rounded-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium">Edit Achievements</p>
          <button onClick={() => { setItems(achievements); setEditing(false); }} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateItem(i, "title", e.target.value)}
                placeholder="500+"
                className="w-20 bg-transparent border border-[var(--border)] rounded-sm px-2 py-1 text-sm focus:border-[var(--accent)] focus:outline-none"
              />
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(i, "description", e.target.value)}
                placeholder="Description"
                className="flex-1 bg-transparent border border-[var(--border)] rounded-sm px-2 py-1 text-sm focus:border-[var(--accent)] focus:outline-none"
              />
              <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          {items.length < MAX_ACHIEVEMENTS && (
            <button
              onClick={addItem}
              className="flex items-center gap-1 px-3 py-1 text-xs text-[var(--accent)] border border-[var(--accent)]/30 rounded-sm hover:bg-[var(--accent)]/10"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          )}
          <div className="flex-1" />
          <button
            onClick={() => { setItems(achievements); setEditing(false); }}
            className="px-3 py-1 bg-[var(--muted)] text-[var(--foreground)] text-xs rounded-sm hover:opacity-80"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="px-3 py-1 bg-[var(--accent)] text-white text-xs rounded-sm hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative cursor-pointer col-span-full grid grid-cols-2 md:grid-cols-4 gap-6"
      onClick={() => setEditing(true)}
    >
      <div className="absolute inset-0 group-hover:outline group-hover:outline-2 group-hover:outline-dashed group-hover:outline-[var(--accent)]/50 group-hover:rounded-sm transition-all -m-2 pointer-events-none" />
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--accent)] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md z-10">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      </div>
      {children}
    </div>
  );
}
