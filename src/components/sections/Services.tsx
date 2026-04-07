"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "@/components/ui/AnimatedText";
import { services as demoServices } from "@/lib/demo-data";
import { useSanityQuery } from "@/hooks/useSanity";
import { servicesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const { data: sanityServices } = useSanityQuery(servicesQuery);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const services = sanityServices?.length
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? sanityServices.map((s: any) => ({
        title: s.title,
        slug: s.slug || s.title?.toLowerCase().replace(/\s+/g, "-"),
        shortDescription: s.shortDescription || "",
        coverImage: s.coverImage
          ? urlFor(s.coverImage).width(800).height(600).url()
          : "",
        priceRange: s.priceRange || "",
      }))
    : demoServices;

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-accent text-xs uppercase tracking-[0.3em] mb-4"
          >
            What I Offer
          </motion.p>
          <AnimatedText
            text="Services"
            as="h2"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service: { slug: string; title: string; coverImage: string; priceRange: string; shortDescription: string }, i: number) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
            >
              <Link href={`/services#${service.slug}`}>
                <div className="relative group aspect-[4/5] overflow-hidden rounded-sm cursor-pointer">
                  <Image
                    src={service.coverImage}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <p className="text-accent text-xs uppercase tracking-[0.2em] mb-2">
                      {service.priceRange}
                    </p>
                    <h3 className="text-foreground text-xl md:text-2xl font-serif mb-2">
                      {service.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
