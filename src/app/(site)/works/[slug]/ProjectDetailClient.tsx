"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/lib/types";

export default function ProjectDetailClient({
  project,
  prevProject,
  nextProject,
}: {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}) {
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/works"
            className="inline-flex items-center gap-2 text-accent text-sm hover:underline"
          >
            <ArrowLeft size={14} />
            Back to Works
          </Link>
        </motion.div>

        {/* Title */}
        <AnimatedText
          text={project.title}
          as="h1"
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6"
          delay={0.2}
        />

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground mb-8"
        >
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-accent/60" />
            {formatDate(project.date)}
          </span>
          <span className="flex items-center gap-2">
            <Tag size={14} className="text-accent/60" />
            <span className="capitalize">{project.category}</span>
          </span>
          {project.client && (
            <span className="flex items-center gap-2">
              <User size={14} className="text-accent/60" />
              {project.client}
            </span>
          )}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-foreground/70 text-base md:text-lg leading-relaxed mb-12"
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-card border border-border text-muted-foreground text-xs px-3 py-1 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16"
        >
          {project.gallery && project.gallery.length > 0 ? (
            project.gallery.map((img, idx) => (
              <div key={idx} className="aspect-[4/3] relative overflow-hidden rounded-sm">
                <Image
                  src={img}
                  alt={`${project.title} - Gallery ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))
          ) : (
            <>
              <div className="aspect-[4/3] relative overflow-hidden rounded-sm">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} - Gallery 1`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="aspect-[4/3] relative overflow-hidden rounded-sm">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} - Gallery 2`}
                  fill
                  className="object-cover object-left"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </>
          )}
        </motion.div>

        {/* Prev/Next navigation */}
        <div className="border-t border-border pt-8 pb-20 flex justify-between">
          {prevProject ? (
            <Link
              href={`/works/${prevProject.slug}`}
              className="text-foreground/60 hover:text-accent transition-colors"
            >
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Previous
              </span>
              <p className="font-serif text-lg">{prevProject.title}</p>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/works/${nextProject.slug}`}
              className="text-right text-foreground/60 hover:text-accent transition-colors"
            >
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Next
              </span>
              <p className="font-serif text-lg">{nextProject.title}</p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
