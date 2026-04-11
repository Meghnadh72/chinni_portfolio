import { getAllProjects, getCategories } from "@/lib/data";
import WorksPageClient from "./WorksPageClient";

export default async function WorksPage() {
  const [projects, categories] = await Promise.all([
    getAllProjects(),
    getCategories(),
  ]);

  return <WorksPageClient projects={projects} categories={categories} />;
}
