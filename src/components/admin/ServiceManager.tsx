"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Trash2, Save, ChevronLeft } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import type { Service } from "@/lib/types";

interface ServiceManagerProps {
  open: boolean;
  onClose: () => void;
}

interface ServiceForm {
  id?: string;
  title: string;
  slug: string;
  short_description: string;
  cover_image: string;
  price_range: string;
  features: string[];
  icon: string;
  order_rank: number;
}

function toForm(s: Service): ServiceForm {
  return {
    id: s.id,
    title: s.title,
    slug: s.slug,
    short_description: s.shortDescription,
    cover_image: s.coverImage,
    price_range: s.priceRange,
    features: s.features,
    icon: s.icon,
    order_rank: s.orderRank,
  };
}

const emptyForm: ServiceForm = {
  title: "",
  slug: "",
  short_description: "",
  cover_image: "",
  price_range: "",
  features: [],
  icon: "Camera",
  order_rank: 0,
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ServiceManager({ open, onClose }: ServiceManagerProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ServiceForm | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const router = useRouter();

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      if (res.ok) setServices(await res.json());
    } catch { /* fallback */ }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching data on open
    if (open) loadServices();
  }, [open]);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);

    const data = { ...selected };
    if (!data.slug && data.title) {
      data.slug = slugify(data.title);
    }

    if (isNew) {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "cp_services", data }),
      });
      if (res.ok) {
        setSelected(null);
        setIsNew(false);
        await loadServices();
        router.refresh();
      }
    } else {
      const fields = Object.keys(data).filter((k) => k !== "id") as (keyof ServiceForm)[];
      for (const field of fields) {
        await fetch("/api/admin/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "cp_services",
            rowId: data.id,
            column: field,
            value: data[field],
          }),
        });
      }
      setSelected(null);
      await loadServices();
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
      body: JSON.stringify({ table: "cp_services", rowId: selected.id }),
    });
    setSelected(null);
    setDeleting(false);
    await loadServices();
    router.refresh();
  };

  const addFeature = () => {
    if (!featureInput.trim() || !selected) return;
    setSelected({ ...selected, features: [...selected.features, featureInput.trim()] });
    setFeatureInput("");
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
            <h2 className="font-serif text-xl">Services</h2>
          )}
          <button onClick={onClose} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!selected ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[var(--muted-foreground)]">{services.length} services</p>
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
                  {services.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setSelected(toForm(s)); setIsNew(false); }}
                      className="w-full p-3 rounded-sm border border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all text-left"
                    >
                      <p className="font-serif text-sm">{s.title}</p>
                      <p className="text-xs text-[var(--accent)]">{s.priceRange}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{s.features.length} features</p>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="font-serif text-lg">{isNew ? "New Service" : "Edit Service"}</h3>

              <ImageUpload
                value={selected.cover_image}
                onChange={(url) => setSelected({ ...selected, cover_image: url })}
                folder="services"
                aspectRatio="aspect-video"
                label="Cover Image"
              />

              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Title</label>
                <input
                  type="text"
                  value={selected.title}
                  onChange={(e) => setSelected({ ...selected, title: e.target.value })}
                  className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Description</label>
                <textarea
                  value={selected.short_description}
                  onChange={(e) => setSelected({ ...selected, short_description: e.target.value })}
                  rows={3}
                  className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Price Range</label>
                <input
                  type="text"
                  value={selected.price_range}
                  onChange={(e) => setSelected({ ...selected, price_range: e.target.value })}
                  placeholder="Starting from $500"
                  className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              {/* Features */}
              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Features</label>
                <div className="space-y-1 mb-2">
                  {selected.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="flex-1 text-sm text-[var(--foreground)]">{f}</span>
                      <button
                        onClick={() => setSelected({ ...selected, features: selected.features.filter((_, j) => j !== i) })}
                        className="text-red-400 hover:text-red-300 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    placeholder="Add feature..."
                    className="flex-1 bg-transparent border border-[var(--border)] rounded-sm px-3 py-1.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                  />
                  <button onClick={addFeature} className="px-3 py-1.5 text-xs border border-[var(--accent)]/30 text-[var(--accent)] rounded-sm hover:bg-[var(--accent)]/10">
                    Add
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-[var(--border)]">
                <button
                  onClick={handleSave}
                  disabled={saving || !selected.title}
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
