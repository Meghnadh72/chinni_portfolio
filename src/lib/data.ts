import { supabase } from "./supabase";
import {
  siteSettings as demoSiteSettings,
  photographer as demoPhotographer,
  categories as demoCategories,
  projects as demoProjects,
  services as demoServices,
  testimonials as demoTestimonials,
  events as demoEvents,
} from "./demo-data";
import type {
  SiteSettings,
  Photographer,
  Category,
  Project,
  Service,
  Testimonial,
  Event,
} from "./types";

// ---------------------------------------------------------------------------
// Mapper functions (snake_case DB → camelCase app)
// ---------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSiteSettings(row: any): SiteSettings {
  return {
    siteName: row.site_name ?? "",
    tagline: row.tagline ?? "",
    heroHeading: row.hero_heading ?? "",
    heroDescription: row.hero_description ?? "",
    heroImage: row.hero_image ?? "",
    contactEmail: row.contact_email ?? "",
    contactPhone: row.contact_phone ?? "",
    address: row.address ?? "",
    instagramUrl: row.instagram_url ?? "",
    facebookUrl: row.facebook_url ?? "",
    youtubeUrl: row.youtube_url ?? "",
    whatsappUrl: row.whatsapp_url ?? "",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPhotographer(row: any): Photographer {
  return {
    name: row.name ?? "",
    shortBio: row.short_bio ?? "",
    fullBio: row.full_bio ?? "",
    philosophy: row.philosophy ?? "",
    portrait: row.portrait ?? "",
    achievements: Array.isArray(row.achievements) ? row.achievements : [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCategory(row: any): Category {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description ?? "",
    orderRank: row.order_rank ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProject(row: any): Project {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category ?? "",
    coverImage: row.cover_image ?? "",
    gallery: row.gallery ?? [],
    description: row.description ?? "",
    client: row.client ?? null,
    date: row.date ?? "",
    featured: row.featured ?? false,
    tags: row.tags ?? [],
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapService(row: any): Service {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.short_description ?? "",
    coverImage: row.cover_image ?? "",
    priceRange: row.price_range ?? "",
    features: row.features ?? [],
    icon: row.icon ?? "",
    orderRank: row.order_rank ?? 0,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTestimonial(row: any): Testimonial {
  return {
    id: row.id,
    clientName: row.client_name,
    clientRole: row.client_role ?? "",
    quote: row.quote,
    rating: row.rating ?? 5,
    featured: row.featured ?? true,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEvent(row: any): Event {
  return {
    id: row.id,
    title: row.title,
    eventType: row.event_type ?? "",
    date: row.date ?? "",
    endDate: row.end_date ?? "",
    location: row.location ?? "",
    description: row.description ?? "",
    registrationUrl: row.registration_url ?? "",
    coverImage: row.cover_image ?? "",
  };
}

// ---------------------------------------------------------------------------
// Demo data fallback adapters (match app types)
// ---------------------------------------------------------------------------

const fallbackSettings: SiteSettings = {
  siteName: demoSiteSettings.siteName,
  tagline: demoSiteSettings.tagline,
  heroHeading: demoSiteSettings.siteName,
  heroDescription: "Capturing moments that last forever",
  heroImage:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop",
  contactEmail: demoSiteSettings.contactEmail,
  contactPhone: demoSiteSettings.contactPhone,
  address: demoSiteSettings.address,
  instagramUrl: demoSiteSettings.socialLinks.instagram,
  facebookUrl: demoSiteSettings.socialLinks.facebook,
  youtubeUrl: demoSiteSettings.socialLinks.youtube,
  whatsappUrl: demoSiteSettings.socialLinks.whatsapp,
};

const fallbackPhotographer: Photographer = {
  name: demoPhotographer.name,
  shortBio: demoPhotographer.shortBio,
  fullBio: demoPhotographer.fullBio,
  philosophy: demoPhotographer.philosophy,
  portrait:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
  achievements: [
    { title: "500+", description: "Weddings Captured" },
    { title: "Featured", description: "Vogue & Harper's Bazaar" },
    { title: "Award", description: "International Photography Awards 2024" },
    { title: "10+", description: "Years of Experience" },
  ],
};

const fallbackCategories: Category[] = demoCategories.map((c, i) => ({
  id: `cat-${i}`,
  title: c.title,
  slug: c.slug,
  description: c.description,
  orderRank: i + 1,
}));

const fallbackProjects: Project[] = demoProjects.map((p, i) => ({
  id: `proj-${i}`,
  title: p.title,
  slug: p.slug,
  category: p.category,
  coverImage: p.coverImage,
  gallery: [],
  description: p.description,
  client: p.client,
  date: p.date,
  featured: p.featured,
  tags: p.tags,
}));

const fallbackServices: Service[] = demoServices.map((s, i) => ({
  id: `svc-${i}`,
  title: s.title,
  slug: s.slug,
  shortDescription: s.shortDescription,
  coverImage: s.coverImage,
  priceRange: s.priceRange,
  features: s.features,
  icon: s.icon,
  orderRank: i + 1,
}));

const fallbackTestimonials: Testimonial[] = demoTestimonials.map((t, i) => ({
  id: `test-${i}`,
  clientName: t.clientName,
  clientRole: t.clientRole,
  quote: t.quote,
  rating: t.rating,
  featured: true,
}));

const fallbackEvents: Event[] = demoEvents.map((e, i) => ({
  id: `evt-${i}`,
  title: e.title,
  eventType: e.eventType,
  date: e.date,
  endDate: e.endDate,
  location: e.location,
  description: e.description,
  registrationUrl: e.registrationUrl,
  coverImage: "",
}));

// ---------------------------------------------------------------------------
// Public fetch functions
// ---------------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!supabase) return fallbackSettings;
  try {
    const { data, error } = await supabase
      .from("cp_site_settings")
      .select("*")
      .eq("id", "main")
      .single();
    if (error) throw error;
    if (data) return mapSiteSettings(data);
  } catch (e) {
    console.warn("Supabase fetch failed (cp_site_settings):", (e as Error).message);
  }
  return fallbackSettings;
}

export async function getPhotographer(): Promise<Photographer> {
  if (!supabase) return fallbackPhotographer;
  try {
    const { data, error } = await supabase
      .from("cp_photographer")
      .select("*")
      .eq("id", "main")
      .single();
    if (error) throw error;
    if (data) return mapPhotographer(data);
  } catch (e) {
    console.warn("Supabase fetch failed (cp_photographer):", (e as Error).message);
  }
  return fallbackPhotographer;
}

export async function getCategories(): Promise<Category[]> {
  if (!supabase) return fallbackCategories;
  try {
    const { data, error } = await supabase
      .from("cp_categories")
      .select("*")
      .order("order_rank", { ascending: true });
    if (error) throw error;
    if (data?.length) return data.map(mapCategory);
  } catch (e) {
    console.warn("Supabase fetch failed (cp_categories):", (e as Error).message);
  }
  return fallbackCategories;
}

export async function getAllProjects(): Promise<Project[]> {
  if (!supabase) return fallbackProjects;
  try {
    const { data, error } = await supabase
      .from("cp_projects")
      .select("*")
      .order("date", { ascending: false });
    if (error) throw error;
    if (data?.length) return data.map(mapProject);
  } catch (e) {
    console.warn("Supabase fetch failed (cp_projects):", (e as Error).message);
  }
  return fallbackProjects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  if (!supabase) return fallbackProjects.filter((p) => p.featured).slice(0, 6);
  try {
    const { data, error } = await supabase
      .from("cp_projects")
      .select("*")
      .eq("featured", true)
      .order("date", { ascending: false })
      .limit(6);
    if (error) throw error;
    if (data?.length) return data.map(mapProject);
  } catch (e) {
    console.warn("Supabase fetch failed (cp_projects featured):", (e as Error).message);
  }
  return fallbackProjects.filter((p) => p.featured).slice(0, 6);
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | null> {
  if (!supabase) return fallbackProjects.find((p) => p.slug === slug) ?? null;
  try {
    const { data, error } = await supabase
      .from("cp_projects")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error) throw error;
    if (data) return mapProject(data);
  } catch (e) {
    console.warn("Supabase fetch failed (cp_projects slug):", (e as Error).message);
  }
  return fallbackProjects.find((p) => p.slug === slug) ?? null;
}

export async function getServices(): Promise<Service[]> {
  if (!supabase) return fallbackServices;
  try {
    const { data, error } = await supabase
      .from("cp_services")
      .select("*")
      .order("order_rank", { ascending: true });
    if (error) throw error;
    if (data?.length) return data.map(mapService);
  } catch (e) {
    console.warn("Supabase fetch failed (cp_services):", (e as Error).message);
  }
  return fallbackServices;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return fallbackTestimonials;
  try {
    const { data, error } = await supabase
      .from("cp_testimonials")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });
    if (error) throw error;
    if (data?.length) return data.map(mapTestimonial);
  } catch (e) {
    console.warn("Supabase fetch failed (cp_testimonials):", (e as Error).message);
  }
  return fallbackTestimonials;
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return fallbackTestimonials;
  try {
    const { data, error } = await supabase
      .from("cp_testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    if (data?.length) return data.map(mapTestimonial);
  } catch (e) {
    console.warn("Supabase fetch failed (cp_testimonials all):", (e as Error).message);
  }
  return fallbackTestimonials;
}

export async function getEvents(): Promise<Event[]> {
  if (!supabase) return fallbackEvents;
  try {
    const { data, error } = await supabase
      .from("cp_events")
      .select("*")
      .order("date", { ascending: true });
    if (error) throw error;
    if (data?.length) return data.map(mapEvent);
  } catch (e) {
    console.warn("Supabase fetch failed (cp_events):", (e as Error).message);
  }
  return fallbackEvents;
}
