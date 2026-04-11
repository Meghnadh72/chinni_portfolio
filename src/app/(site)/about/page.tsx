import { getPhotographer } from "@/lib/data";
import AboutPageClient from "./AboutPageClient";

export default async function AboutPage() {
  const photographer = await getPhotographer();
  return <AboutPageClient photographer={photographer} />;
}
