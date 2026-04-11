"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Plus, Trash2, Save, ChevronLeft } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import type { Project } from "@/lib/types";

interface ProjectManagerProps {
  open: boolean;
  onClose: () => void;
}

interface ProjectForm {
  id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  cover_image: string;
  gallery: string[];
  client: string;
  date: string;
  featured: boolean;
  tags: string[];
}

function toForm(p: Project): ProjectForm {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    category: p.category,
    cover_image: p.coverImage,
    gallery: p.gallery,
    client: p.client ?? "",
    date: p.date,
    featured: p.featured,
    tags: p.tags,
  };
}

const CATEGORIES = ["wedding", "portrait", "events", "landscape", "fashion"];

const emptyForm: ProjectForm = {
  title: "",
  slug: "",
  description: "",
  category: "wedding",
  cover_image: "",
  gallery: [],
  client: "",
  date: new Date().toISOString().split("T")[0],
  featured: false,
  tags: [],
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function ProjectManager({ open, onClose }: ProjectManagerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ProjectForm | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const router = useRouter();

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) setProjects(await res.json());
    } catch { /* fallback */ }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching data on open
    if (open) loadProjects();
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
        body: JSON.stringify({ table: "cp_projects", data }),
      });
      if (res.ok) {
        setSelected(null);
        setIsNew(false);
        await loadProjects();
        router.refresh();
      }
    } else {
      const fields = Object.keys(data).filter((k) => k !== "id") as (keyof ProjectForm)[];
      for (const field of fields) {
        await fetch("/api/admin/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "cp_projects",
            rowId: data.id,
            column: field,
            value: data[field],
          }),
        });
      }
      setSelected(null);
      await loadProjects();
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
      body: JSON.stringify({ table: "cp_projects", rowId: selected.id }),
    });
    setSelected(null);
    setDeleting(false);
    await loadProjects();
    router.refresh();
  };

  const addTag = () => {
    if (!tagInput.trim() || !selected) return;
    setSelected({ ...selected, tags: [...selected.tags, tagInput.trim()] });
    setTagInput("");
  };

  const removeTag = (index: number) => {
    if (!selected) return;
    setSelected({ ...selected, tags: selected.tags.filter((_, i) => i !== index) });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-2xl bg-[var(--background)] border-l border-[var(--border)] h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 bg-[var(--background)] border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
          {selected ? (
            <button onClick={() => setSelected(null)} className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              <ChevronLeft className="w-4 h-4" /> Back to list
            </button>
          ) : (
            <h2 className="font-serif text-xl">Portfolio Manager</h2>
          )}
          <button onClick={onClose} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!selected ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[var(--muted-foreground)]">{projects.length} projects</p>
                <button
                  onClick={() => { setSelected({ ...emptyForm }); setIsNew(true); }}
                  className="flex items-center gap-1 px-4 py-2 bg-[var(--accent)] text-white text-sm rounded-sm hover:opacity-90"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              {loading ? (
                <p className="text-sm text-[var(--muted-foreground)]">Loading...</p>
              ) : (
                <div className="space-y-3">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { setSelected(toForm(p)); setIsNew(false); }}
                      className="w-full flex items-center gap-4 p-3 rounded-sm border border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all text-left"
                    >
                      <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0 bg-[var(--muted)]">
                        {p.coverImage && (
                          <Image src={p.coverImage} alt={p.title} fill className="object-cover" sizes="64px" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm truncate">{p.title}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{p.category} · {p.date}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {p.featured && <span className="text-xs bg-[var(--accent)]/20 text-[var(--accent)] px-1.5 py-0.5 rounded">Featured</span>}
                          {p.client && <span className="text-xs text-[var(--muted-foreground)]">{p.client}</span>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="font-serif text-lg">{isNew ? "New Project" : "Edit Project"}</h3>

              <ImageUpload
                value={selected.cover_image}
                onChange={(url) => setSelected({ ...selected, cover_image: url })}
                folder="projects"
                aspectRatio="aspect-video"
                label="Cover Image"
              />

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Title</label>
                  <input
                    type="text"
                    value={selected.title}
                    onChange={(e) => setSelected({ ...selected, title: e.target.value })}
                    className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Description</label>
                  <textarea
                    value={selected.description}
                    onChange={(e) => setSelected({ ...selected, description: e.target.value })}
                    rows={3}
                    className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Category</label>
                  <select
                    value={selected.category}
                    onChange={(e) => setSelected({ ...selected, category: e.target.value })}
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Client</label>
                  <input
                    type="text"
                    value={selected.client}
                    onChange={(e) => setSelected({ ...selected, client: e.target.value })}
                    placeholder="Client name..."
                    className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Date</label>
                  <input
                    type="date"
                    value={selected.date}
                    onChange={(e) => setSelected({ ...selected, date: e.target.value })}
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected.featured}
                      onChange={(e) => setSelected({ ...selected, featured: e.target.checked })}
                      className="accent-[var(--accent)]"
                    />
                    <span className="text-sm">Featured</span>
                  </label>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Tags</label>
                <div className="flex flex-wrap gap-1 mb-2">
                  {selected.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-xs rounded">
                      {tag}
                      <button onClick={() => removeTag(i)} className="hover:text-red-400">x</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    placeholder="Add tag..."
                    className="flex-1 bg-transparent border border-[var(--border)] rounded-sm px-3 py-1.5 text-sm focus:border-[var(--accent)] focus:outline-none"
                  />
                  <button onClick={addTag} className="px-3 py-1.5 text-xs border border-[var(--accent)]/30 text-[var(--accent)] rounded-sm hover:bg-[var(--accent)]/10">
                    Add
                  </button>
                </div>
              </div>

              {/* Gallery */}
              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Gallery Images</label>
                <div className="space-y-3">
                  {selected.gallery.map((url, i) => (
                    <div key={i} className="relative">
                      <ImageUpload
                        value={url}
                        onChange={(newUrl) => {
                          const g = [...selected.gallery];
                          g[i] = newUrl;
                          setSelected({ ...selected, gallery: g });
                        }}
                        folder="projects"
                        aspectRatio="aspect-video"
                      />
                      <button
                        onClick={() => setSelected({ ...selected, gallery: selected.gallery.filter((_, j) => j !== i) })}
                        className="absolute top-1 left-1 z-10 bg-red-500/80 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setSelected({ ...selected, gallery: [...selected.gallery, ""] })}
                    className="flex items-center gap-1 px-3 py-2 text-xs text-[var(--accent)] border border-dashed border-[var(--accent)]/30 rounded-sm hover:bg-[var(--accent)]/5 w-full justify-center"
                  >
                    <Plus className="w-3 h-3" /> Add gallery image
                  </button>
                </div>
              </div>

              {/* Actions */}
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
