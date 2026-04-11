import { getSiteSettings, getServices } from "@/lib/data";
import ContactPageClient from "./ContactPageClient";

export default async function ContactPage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  return <ContactPageClient settings={settings} services={services} />;
}
