"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import FilterBar from "@/components/ui/FilterBar";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Project, Category } from "@/lib/types";

export default function WorksPageClient({
  projects,
  categories,
}: {
  projects: Project[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent text-xs uppercase tracking-[0.3em] mb-4"
          >
            Portfolio
          </motion.p>
          <AnimatedText
            text="All Works"
            as="h1"
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto mb-10"
          >
            A curated collection of stories captured through the lens — from intimate weddings
            to dramatic landscapes.
          </motion.p>

          {/* Filter */}
          <div className="flex justify-center">
            <FilterBar
              categories={categories.map((c) => c.slug)}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-20">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
              >
                <ProjectCard
                  title={project.title}
                  slug={project.slug}
                  category={project.category}
                  coverImage={project.coverImage}
                  tall={i % 3 === 0}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
