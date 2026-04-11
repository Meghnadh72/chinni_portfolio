"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Trash2, Save, ChevronLeft, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

interface TestimonialManagerProps {
  open: boolean;
  onClose: () => void;
}

interface TestimonialForm {
  id?: string;
  client_name: string;
  client_role: string;
  quote: string;
  rating: number;
  featured: boolean;
}

function toForm(t: Testimonial): TestimonialForm {
  return {
    id: t.id,
    client_name: t.clientName,
    client_role: t.clientRole,
    quote: t.quote,
    rating: t.rating,
    featured: t.featured,
  };
}

const emptyForm: TestimonialForm = {
  client_name: "",
  client_role: "",
  quote: "",
  rating: 5,
  featured: true,
};

export default function TestimonialManager({ open, onClose }: TestimonialManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<TestimonialForm | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const loadTestimonials = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) setTestimonials(await res.json());
    } catch { /* fallback */ }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching data on open
    if (open) loadTestimonials();
  }, [open]);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);

    if (isNew) {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "cp_testimonials", data: selected }),
      });
      if (res.ok) {
        setSelected(null);
        setIsNew(false);
        await loadTestimonials();
        router.refresh();
      }
    } else {
      const fields = Object.keys(selected).filter((k) => k !== "id") as (keyof TestimonialForm)[];
      for (const field of fields) {
        await fetch("/api/admin/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "cp_testimonials",
            rowId: selected.id,
            column: field,
            value: selected[field],
          }),
        });
      }
      setSelected(null);
      await loadTestimonials();
      router.refresh();
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!selected?.id) return;
    setDeleting(true);
    await fetch("/api/admin/update", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: "cp_testimonials", rowId: selected.id }),
    });
    setSelected(null);
    setDeleting(false);
    await loadTestimonials();
    router.refresh();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-lg bg-[var(--background)] border-l border-[var(--border)] h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 bg-[var(--background)] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
          {selected ? (
            <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              <ChevronLeft className="w-4 h-4" /> Back to list
            </button>
          ) : (
            <h2 className="font-serif text-xl">Testimonials</h2>
          )}
          <button onClick={onClose} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!selected ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[var(--muted-foreground)]">{testimonials.length} testimonials</p>
                <button
                  onClick={() => { setSelected({ ...emptyForm }); setIsNew(true); }}
                  className="flex items-center gap-1 px-4 py-2 bg-[var(--accent)] text-white text-sm rounded-sm hover:opacity-90"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              {loading ? (
                <p className="text-sm text-[var(--muted-foreground)]">Loading...</p>
              ) : (
                <div className="space-y-3">
                  {testimonials.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setSelected(toForm(t)); setIsNew(false); }}
                      className="w-full p-3 rounded-sm border border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all text-left"
                    >
                      <p className="font-serif text-sm">{t.clientName}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{t.clientRole}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[var(--accent)] text-[var(--accent)]" />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="font-serif text-lg">{isNew ? "New Testimonial" : "Edit Testimonial"}</h3>

              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Client Name</label>
                <input
                  type="text"
                  value={selected.client_name}
                  onChange={(e) => setSelected({ ...selected, client_name: e.target.value })}
                  className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Role / Title</label>
                <input
                  type="text"
                  value={selected.client_role}
                  onChange={(e) => setSelected({ ...selected, client_role: e.target.value })}
                  placeholder="e.g., Bride, Event Director..."
                  className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Quote</label>
                <textarea
                  value={selected.quote}
                  onChange={(e) => setSelected({ ...selected, quote: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setSelected({ ...selected, rating: n })}
                        className="p-1"
                      >
                        <Star
                          className={`w-5 h-5 ${n <= selected.rating ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--border)]"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer mt-4">
                  <input
                    type="checkbox"
                    checked={selected.featured}
                    onChange={(e) => setSelected({ ...selected, featured: e.target.checked })}
                    className="accent-[var(--accent)]"
                  />
                  <span className="text-sm">Featured</span>
                </label>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
                <button
                  onClick={handleSave}
                  disabled={saving || !selected.client_name || !selected.quote}
                  className="flex items-center gap-1 px-4 py-2 bg-[var(--accent)] text-white text-sm rounded-sm hover:opacity-90 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => { setSelected(null); setIsNew(false); }}
                  className="px-4 py-2 bg-[var(--muted)] text-[var(--foreground)] text-sm rounded-sm hover:opacity-80"
                >
                  Cancel
                </button>
                {!isNew && (
                  <>
                    <div className="flex-1" />
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="flex items-center gap-1 px-4 py-2 text-red-400 hover:text-red-300 text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
