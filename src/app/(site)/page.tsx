import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import ContactCTA from "@/components/sections/ContactCTA";
import {
  getSiteSettings,
  getPhotographer,
  getFeaturedProjects,
  getServices,
  getTestimonials,
  getEvents,
} from "@/lib/data";

export default async function HomePage() {
  const [settings, photographer, projects, services, testimonials, events] =
    await Promise.all([
      getSiteSettings(),
      getPhotographer(),
      getFeaturedProjects(),
      getServices(),
      getTestimonials(),
      getEvents(),
    ]);

  return (
    <>
      <Hero settings={settings} />
      <About photographer={photographer} />
      <PortfolioGrid projects={projects} />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />
      <UpcomingEvents events={events} />
      <ContactCTA />
    </>
  );
}
