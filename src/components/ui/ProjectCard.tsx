"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  tall?: boolean;
}

export default function ProjectCard({
  title,
  slug,
  category,
  coverImage,
  tall = false,
}: ProjectCardProps) {
  return (
    <Link href={`/works/${slug}`}>
      <motion.div
        className={`relative group overflow-hidden rounded-sm cursor-pointer ${
          tall ? "aspect-[3/4]" : "aspect-[4/3]"
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
          <p className="text-accent text-xs uppercase tracking-[0.2em] mb-1">
            {category}
          </p>
          <h3 className="text-foreground text-lg md:text-xl font-serif">{title}</h3>
        </div>
      </motion.div>
    </Link>
  );
}
