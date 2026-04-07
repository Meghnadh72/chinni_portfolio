import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import ContactCTA from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <PortfolioGrid />
      <Services />
      <Testimonials />
      <UpcomingEvents />
      <ContactCTA />
    </>
  );
}
