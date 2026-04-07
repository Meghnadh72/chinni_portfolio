"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";

export default function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden" ref={ref}>
      {/* Background image with parallax-like effect */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&h=800&fit=crop"
          alt="Contact background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-accent text-xs uppercase tracking-[0.3em] mb-4"
        >
          Get In Touch
        </motion.p>

        <AnimatedText
          text="Let's Create Something Beautiful"
          as="h2"
          className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto mb-10"
        >
          Whether it&apos;s a wedding, portrait session, or creative project — I&apos;d love to hear
          your story and bring your vision to life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/contact"
            className="inline-block bg-accent text-background px-10 py-4 text-sm uppercase tracking-[0.2em] hover:bg-accent-light transition-colors duration-300"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
