"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import ImageReveal from "@/components/ui/ImageReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import { photographer } from "@/lib/demo-data";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <ImageReveal
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&h=900&fit=crop"
            alt={photographer.name}
            className="aspect-[3/4] rounded-sm"
          />

          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-accent text-xs uppercase tracking-[0.3em] mb-4"
            >
              About the Artist
            </motion.p>

            <AnimatedText
              text={`Meet ${photographer.name}`}
              as="h2"
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6"
              delay={0.3}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-foreground/70 text-base md:text-lg leading-relaxed mb-8"
            >
              {photographer.shortBio}
            </motion.p>

            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="border-l-2 border-accent pl-6 mb-8"
            >
              <p className="text-foreground/60 italic font-serif text-lg">
                &ldquo;{photographer.philosophy}&rdquo;
              </p>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Link
                href="/about"
                className="inline-block border border-accent text-accent px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
