"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/demo-data";

export default function PortfolioGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const featured = projects.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="section-padding bg-muted" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-xs uppercase tracking-[0.3em] mb-4"
          >
            Portfolio
          </motion.p>
          <AnimatedText
            text="Selected Works"
            as="h2"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              <ProjectCard
                title={project.title}
                slug={project.slug}
                category={project.category}
                coverImage={project.coverImage}
                tall={i === 0 || i === 3}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/works"
            className="inline-block border border-accent text-accent px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-all duration-300"
          >
            View All Works
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
