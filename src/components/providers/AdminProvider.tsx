"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Camera, MessageSquare, Briefcase, CalendarDays, LogOut } from "lucide-react";
import ProjectManager from "@/components/admin/ProjectManager";
import TestimonialManager from "@/components/admin/TestimonialManager";
import ServiceManager from "@/components/admin/ServiceManager";
import EventManager from "@/components/admin/EventManager";

interface AdminContextValue {
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  logout: async () => {},
});

export function useAdmin() {
  return useContext(AdminContext);
}

export default function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [testimonialsOpen, setTestimonialsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setIsAdmin(d.isAdmin))
      .catch(() => {});
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAdmin(false);
    window.location.reload();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, logout }}>
      {children}
      {isAdmin && (
        <>
          <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-[var(--accent)] text-white px-4 py-2 rounded-full text-xs uppercase tracking-wider shadow-lg">
            <span>Admin Mode</span>
            <span className="opacity-40">|</span>
            <button onClick={() => setPortfolioOpen(true)} className="hover:underline flex items-center gap-1">
              <Camera className="w-3 h-3" /> Portfolio
            </button>
            <span className="opacity-40">|</span>
            <button onClick={() => setTestimonialsOpen(true)} className="hover:underline flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Reviews
            </button>
            <span className="opacity-40">|</span>
            <button onClick={() => setServicesOpen(true)} className="hover:underline flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> Services
            </button>
            <span className="opacity-40">|</span>
            <button onClick={() => setEventsOpen(true)} className="hover:underline flex items-center gap-1">
              <CalendarDays className="w-3 h-3" /> Events
            </button>
            <span className="opacity-40">|</span>
            <button onClick={logout} className="hover:underline flex items-center gap-1">
              <LogOut className="w-3 h-3" /> Logout
            </button>
          </div>
          <ProjectManager open={portfolioOpen} onClose={() => setPortfolioOpen(false)} />
          <TestimonialManager open={testimonialsOpen} onClose={() => setTestimonialsOpen(false)} />
          <ServiceManager open={servicesOpen} onClose={() => setServicesOpen(false)} />
          <EventManager open={eventsOpen} onClose={() => setEventsOpen(false)} />
        </>
      )}
    </AdminContext.Provider>
  );
}
