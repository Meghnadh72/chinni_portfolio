export interface SiteSettings {
  siteName: string;
  tagline: string;
  heroHeading: string;
  heroDescription: string;
  heroImage: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  whatsappUrl: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Photographer {
  name: string;
  shortBio: string;
  fullBio: string;
  philosophy: string;
  portrait: string;
  achievements: Achievement[];
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  orderRank: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  gallery: string[];
  description: string;
  client: string | null;
  date: string;
  featured: boolean;
  tags: string[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  priceRange: string;
  features: string[];
  icon: string;
  orderRank: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  quote: string;
  rating: number;
  featured: boolean;
}

export interface Event {
  id: string;
  title: string;
  eventType: string;
  date: string;
  endDate: string;
  location: string;
  description: string;
  registrationUrl: string;
  coverImage: string;
}
