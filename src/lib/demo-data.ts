// Demo data for the portfolio — used when Sanity CMS is not configured.
// Replace with Sanity queries once your CMS is set up.

export const siteSettings = {
  siteName: "Lumis Studio",
  tagline: "Crafting unforgettable stories, one frame at a time",
  contactEmail: "hello@lumisstudio.com",
  contactPhone: "+1 (555) 123-4567",
  address: "123 Creative Studio Lane, New York, NY 10001",
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/15551234567",
    youtube: "https://youtube.com",
  },
};

export const photographer = {
  name: "Lumis Studio",
  shortBio:
    "With over a decade behind the lens, I capture the raw emotions and fleeting moments that make life extraordinary. Every frame is a story waiting to be told.",
  fullBio:
    "Photography found me at a time when I was searching for a way to freeze the beauty I saw in everyday moments. What started as a passion quickly became my life's work — over 10 years of capturing weddings, portraits, events, and the quiet poetry of landscapes.\n\nI believe the best photographs are felt, not just seen. My approach blends documentary authenticity with artistic vision, creating images that transport you back to the exact emotion of that moment.\n\nWhen I'm not behind the camera, you'll find me exploring new cities, experimenting with film photography, or mentoring aspiring photographers.",
  philosophy:
    "Light is my paint, the world is my canvas, and every moment is a masterpiece waiting to be revealed.",
  achievements: [
    "500+ Weddings Captured",
    "Featured in Vogue & Harper's Bazaar",
    "International Photography Awards 2024",
    "10+ Years of Experience",
  ],
};

export const categories = [
  { title: "Wedding", slug: "wedding", description: "Timeless wedding stories" },
  { title: "Portrait", slug: "portrait", description: "Authentic portraits" },
  { title: "Events", slug: "events", description: "Corporate & social events" },
  { title: "Landscape", slug: "landscape", description: "Nature & cityscapes" },
  { title: "Fashion", slug: "fashion", description: "Editorial & fashion" },
];

export const projects = [
  {
    title: "A Love Story in Tuscany",
    slug: "love-story-tuscany",
    category: "wedding",
    coverImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop",
    description: "An intimate destination wedding set against the rolling hills of Tuscany.",
    client: "Sarah & James",
    date: "2024-09-15",
    featured: true,
    tags: ["destination", "outdoor", "intimate"],
  },
  {
    title: "Urban Elegance",
    slug: "urban-elegance",
    category: "portrait",
    coverImage: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=1000&fit=crop",
    description: "A portrait series exploring confidence and beauty in the city.",
    client: "Maria K.",
    date: "2024-08-20",
    featured: true,
    tags: ["city", "editorial", "natural-light"],
  },
  {
    title: "Midnight Gala",
    slug: "midnight-gala",
    category: "events",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    description: "A glamorous charity gala with 500 guests under the stars.",
    client: "The Metropolitan Foundation",
    date: "2024-07-10",
    featured: true,
    tags: ["corporate", "gala", "nighttime"],
  },
  {
    title: "Golden Hour Dreams",
    slug: "golden-hour-dreams",
    category: "landscape",
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
    description: "Chasing the perfect light across mountain peaks and valleys.",
    client: null,
    date: "2024-06-05",
    featured: true,
    tags: ["mountains", "golden-hour", "nature"],
  },
  {
    title: "Vogue Editorial",
    slug: "vogue-editorial",
    category: "fashion",
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop",
    description: "A high-fashion editorial shoot for Vogue's spring collection.",
    client: "Vogue Magazine",
    date: "2024-05-15",
    featured: true,
    tags: ["editorial", "high-fashion", "studio"],
  },
  {
    title: "Eternal Vows",
    slug: "eternal-vows",
    category: "wedding",
    coverImage: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1000&fit=crop",
    description: "A breathtaking beach wedding ceremony at sunset.",
    client: "Emily & David",
    date: "2024-04-22",
    featured: true,
    tags: ["beach", "sunset", "romantic"],
  },
  {
    title: "The Quiet Moments",
    slug: "quiet-moments",
    category: "portrait",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop",
    description: "Intimate portraits captured in natural environments.",
    client: "Various",
    date: "2024-03-18",
    featured: false,
    tags: ["natural", "intimate", "lifestyle"],
  },
  {
    title: "Tech Summit 2024",
    slug: "tech-summit-2024",
    category: "events",
    coverImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    description: "Annual technology conference with keynote speakers and exhibitions.",
    client: "TechCorp",
    date: "2024-02-28",
    featured: false,
    tags: ["conference", "corporate", "tech"],
  },
  {
    title: "Nordic Wilderness",
    slug: "nordic-wilderness",
    category: "landscape",
    coverImage: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=1000&fit=crop",
    description: "Northern lights and frozen landscapes of Scandinavia.",
    client: null,
    date: "2024-01-15",
    featured: false,
    tags: ["aurora", "winter", "scandinavia"],
  },
];

export const services = [
  {
    title: "Wedding Photography",
    slug: "wedding-photography",
    icon: "Heart",
    shortDescription: "Your love story, beautifully told through timeless photographs.",
    coverImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
    priceRange: "Starting from $3,000",
    features: [
      "Full-day coverage (up to 12 hours)",
      "Second photographer included",
      "500+ edited high-resolution images",
      "Online gallery with download access",
      "Engagement session included",
      "Custom wedding album design",
    ],
  },
  {
    title: "Portrait Sessions",
    slug: "portrait-sessions",
    icon: "User",
    shortDescription: "Authentic portraits that capture your true essence and personality.",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    priceRange: "Starting from $500",
    features: [
      "1-2 hour session",
      "Indoor or outdoor location",
      "50+ edited images",
      "Professional retouching",
      "Print-ready files",
      "Outfit change included",
    ],
  },
  {
    title: "Event Coverage",
    slug: "event-coverage",
    icon: "Calendar",
    shortDescription: "Professional documentation of your most important occasions.",
    coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    priceRange: "Starting from $1,500",
    features: [
      "Flexible hourly coverage",
      "Quick turnaround (48-72 hours)",
      "High-resolution images",
      "Social media ready formats",
      "Event highlight reel",
      "Corporate branding options",
    ],
  },
];

export const testimonials = [
  {
    clientName: "Sarah Johnson",
    clientRole: "Bride",
    quote:
      "Lumis Studio captured every magical moment of our wedding day. The photos are so beautiful they make me cry every time I look at them. Truly an artist!",
    rating: 5,
  },
  {
    clientName: "Michael Chen",
    clientRole: "Event Director",
    quote:
      "We've worked with many photographers, but Lumis Studio's ability to capture the energy and emotion of our events is unmatched. A true professional.",
    rating: 5,
  },
  {
    clientName: "Amara Okafor",
    clientRole: "Model & Actress",
    quote:
      "Every portrait session feels effortless. Lumis Studio has an incredible eye for light and knows exactly how to bring out the best in everyone.",
    rating: 5,
  },
  {
    clientName: "David & Emily Park",
    clientRole: "Couple",
    quote:
      "From our engagement shoot to the wedding day, Lumis Studio was there for every step. The photos tell our love story perfectly.",
    rating: 5,
  },
  {
    clientName: "Lisa Rodriguez",
    clientRole: "Creative Director, Vogue",
    quote:
      "Lumis Studio's editorial work is stunning. Every image has a cinematic quality that elevates any publication. Absolutely world-class.",
    rating: 5,
  },
];

export const events = [
  {
    title: "Photography Masterclass: Light & Shadow",
    eventType: "Workshop",
    date: "2025-06-15",
    endDate: "2025-06-15",
    location: "Creative Studio, New York",
    description:
      "An intensive one-day workshop exploring the art of natural light photography. Learn advanced techniques for creating dramatic, mood-driven images.",
    registrationUrl: "#",
  },
  {
    title: "Faces of the City — Exhibition",
    eventType: "Exhibition",
    date: "2025-07-20",
    endDate: "2025-08-10",
    location: "Gallery Moderne, Chelsea, NYC",
    description:
      "A solo exhibition featuring 40 large-format portrait prints from the 'Faces of the City' series. Opening night with wine reception.",
    registrationUrl: "#",
  },
  {
    title: "Sunset Portrait Mini Sessions",
    eventType: "Shoot",
    date: "2025-08-05",
    endDate: "2025-08-05",
    location: "Central Park, New York",
    description:
      "Limited 20-minute golden hour portrait sessions in Central Park. Perfect for couples, families, or individual portraits.",
    registrationUrl: "#",
  },
];
