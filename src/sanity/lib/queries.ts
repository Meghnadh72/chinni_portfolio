// GROQ queries for fetching data from Sanity CMS
// These will be used when you connect Sanity — currently the app uses demo-data.ts

export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

export const photographerQuery = `*[_type == "photographer"][0]`;

export const categoriesQuery = `*[_type == "category"] | order(orderRank asc) { title, "slug": slug.current, description }`;

export const projectsQuery = `*[_type == "project"] | order(date desc) {
  title,
  "slug": slug.current,
  "category": category->title,
  "categorySlug": category->slug.current,
  coverImage,
  description,
  client,
  date,
  featured,
  tags
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(date desc)[0...6] {
  title,
  "slug": slug.current,
  "category": category->title,
  coverImage,
  date
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  "category": category->title,
  coverImage,
  images,
  description,
  client,
  date,
  tags
}`;

export const servicesQuery = `*[_type == "service"] | order(orderRank asc) {
  title,
  "slug": slug.current,
  icon,
  shortDescription,
  fullDescription,
  coverImage,
  priceRange,
  features
}`;

export const testimonialsQuery = `*[_type == "testimonial" && featured == true] {
  clientName,
  clientRole,
  quote,
  rating,
  clientPhoto
}`;

export const eventsQuery = `*[_type == "event" && date > now()] | order(date asc) {
  title,
  eventType,
  date,
  endDate,
  location,
  description,
  coverImage,
  registrationUrl
}`;

export const blogPostsQuery = `*[_type == "blogPost"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  coverImage,
  excerpt
}`;
