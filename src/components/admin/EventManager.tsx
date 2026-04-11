"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Trash2, Save, ChevronLeft } from "lucide-react";
import type { Event } from "@/lib/types";

interface EventManagerProps {
  open: boolean;
  onClose: () => void;
}

interface EventForm {
  id?: string;
  title: string;
  event_type: string;
  date: string;
  end_date: string;
  location: string;
  description: string;
  registration_url: string;
  cover_image: string;
}

function toForm(e: Event): EventForm {
  return {
    id: e.id,
    title: e.title,
    event_type: e.eventType,
    date: e.date,
    end_date: e.endDate,
    location: e.location,
    description: e.description,
    registration_url: e.registrationUrl,
    cover_image: e.coverImage,
  };
}

const EVENT_TYPES = ["Workshop", "Exhibition", "Shoot", "Other"];

const emptyForm: EventForm = {
  title: "",
  event_type: "Workshop",
  date: new Date().toISOString().split("T")[0],
  end_date: new Date().toISOString().split("T")[0],
  location: "",
  description: "",
  registration_url: "#",
  cover_image: "",
};

export default function EventManager({ open, onClose }: EventManagerProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<EventForm | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const loadEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      if (res.ok) setEvents(await res.json());
    } catch { /* fallback */ }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetching data on open
    if (open) loadEvents();
  }, [open]);

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);

    if (isNew) {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "cp_events", data: selected }),
      });
      if (res.ok) {
        setSelected(null);
        setIsNew(false);
        await loadEvents();
        router.refresh();
      }
    } else {
      const fields = Object.keys(selected).filter((k) => k !== "id") as (keyof EventForm)[];
      for (const field of fields) {
        await fetch("/api/admin/update", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table: "cp_events",
            rowId: selected.id,
            column: field,
            value: selected[field],
          }),
        });
      }
      setSelected(null);
      await loadEvents();
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
      body: JSON.stringify({ table: "cp_events", rowId: selected.id }),
    });
    setSelected(null);
    setDeleting(false);
    await loadEvents();
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
            <h2 className="font-serif text-xl">Events</h2>
          )}
          <button onClick={onClose} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!selected ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-[var(--muted-foreground)]">{events.length} events</p>
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
                  {events.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => { setSelected(toForm(e)); setIsNew(false); }}
                      className="w-full p-3 rounded-sm border border-[var(--border)] hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/5 transition-all text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-[var(--accent)]/20 text-[var(--accent)] px-1.5 py-0.5 rounded">{e.eventType}</span>
                        <span className="text-xs text-[var(--muted-foreground)]">{e.date}</span>
                      </div>
                      <p className="font-serif text-sm mt-1">{e.title}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{e.location}</p>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="font-serif text-lg">{isNew ? "New Event" : "Edit Event"}</h3>

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
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Event Type</label>
                <select
                  value={selected.event_type}
                  onChange={(e) => setSelected({ ...selected, event_type: e.target.value })}
                  className="w-full bg-[var(--card)] border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Start Date</label>
                  <input
                    type="date"
                    value={selected.date}
                    onChange={(e) => setSelected({ ...selected, date: e.target.value })}
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-[var(--muted-foreground)] mb-1 block">End Date</label>
                  <input
                    type="date"
                    value={selected.end_date}
                    onChange={(e) => setSelected({ ...selected, end_date: e.target.value })}
                    className="w-full bg-[var(--card)] border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Location</label>
                <input
                  type="text"
                  value={selected.location}
                  onChange={(e) => setSelected({ ...selected, location: e.target.value })}
                  className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Description</label>
                <textarea
                  value={selected.description}
                  onChange={(e) => setSelected({ ...selected, description: e.target.value })}
                  rows={3}
                  className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-xs text-[var(--muted-foreground)] mb-1 block">Registration URL</label>
                <input
                  type="text"
                  value={selected.registration_url}
                  onChange={(e) => setSelected({ ...selected, registration_url: e.target.value })}
                  className="w-full bg-transparent border border-[var(--border)] rounded-sm px-3 py-2 text-sm focus:border-[var(--accent)] focus:outline-none"
                />
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
