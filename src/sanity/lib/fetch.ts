import { client } from "./client";
import { photographerQuery, servicesQuery } from "./queries";
import { urlFor } from "./image";
import { photographer as demoPhotographer, services as demoServices } from "@/lib/demo-data";

export type PhotographerData = {
  name: string;
  shortBio: string;
  fullBio: string;
  philosophy: string;
  achievements: string[];
  portraitUrl: string;
};

export type ServiceData = {
  title: string;
  slug: string;
  icon: string;
  shortDescription: string;
  coverImage: string;
  priceRange: string;
  features: string[];
};

// Force static: fetch once at build time, revalidate via webhook (/api/revalidate)
const CACHE_OPTS = { next: { revalidate: false as const } };

export async function getPhotographer(): Promise<PhotographerData> {
  try {
    const data = await client.fetch(photographerQuery, {}, CACHE_OPTS);
    if (!data) throw new Error("No photographer data");

    return {
      name: data.name || demoPhotographer.name,
      shortBio: data.shortBio || demoPhotographer.shortBio,
      fullBio: data.shortBio || demoPhotographer.fullBio,
      philosophy: data.philosophy || demoPhotographer.philosophy,
      achievements: data.achievements?.length ? data.achievements : demoPhotographer.achievements,
      portraitUrl: data.portrait
        ? urlFor(data.portrait).width(700).height(900).url()
        : "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&h=900&fit=crop",
    };
  } catch (e) {
    console.warn("Sanity fetch failed for photographer, using demo data:", e);
    return {
      name: demoPhotographer.name,
      shortBio: demoPhotographer.shortBio,
      fullBio: demoPhotographer.fullBio,
      philosophy: demoPhotographer.philosophy,
      achievements: demoPhotographer.achievements,
      portraitUrl: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&h=900&fit=crop",
    };
  }
}

export async function getServices(): Promise<ServiceData[]> {
  try {
    const data = await client.fetch(servicesQuery, {}, CACHE_OPTS);
    if (!data || data.length === 0) throw new Error("No services data");

    return data.map((s: Record<string, unknown>) => ({
      title: s.title as string,
      slug: (s.slug as string) || (s.title as string).toLowerCase().replace(/\s+/g, "-"),
      icon: (s.icon as string) || "Camera",
      shortDescription: (s.shortDescription as string) || "",
      coverImage: s.coverImage
        ? urlFor(s.coverImage).width(800).height(600).url()
        : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
      priceRange: (s.priceRange as string) || "",
      features: (s.features as string[]) || [],
    }));
  } catch (e) {
    console.warn("Sanity fetch failed for services, using demo data:", e);
    return demoServices.map((s) => ({
      title: s.title,
      slug: s.slug,
      icon: s.icon,
      shortDescription: s.shortDescription,
      coverImage: s.coverImage,
      priceRange: s.priceRange,
      features: s.features,
    }));
  }
}
