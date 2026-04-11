"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import type { Service } from "@/lib/types";

export default function ServicesPageClient({ services }: { services: Service[] }) {
  return (
    <div className="pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent text-xs uppercase tracking-[0.3em] mb-4"
          >
            What I Offer
          </motion.p>
          <AnimatedText
            text="Photography Services"
            as="h1"
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto"
          >
            Every service is tailored to tell your unique story. Let&apos;s find the perfect
            package for your vision.
          </motion.p>
        </div>

        <div className="space-y-20 md:space-y-32 pb-20">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              id={service.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div className={`relative aspect-[4/3] overflow-hidden rounded-sm ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={service.coverImage}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <span className="text-accent text-xs uppercase tracking-[0.2em]">
                  {service.priceRange}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground mt-2 mb-4">
                  {service.title}
                </h2>
                <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {service.features?.length > 0 && (
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-foreground/70 text-sm">
                        <Check size={16} className="text-accent mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href="/contact"
                  className="inline-block border border-accent text-accent px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-accent hover:text-background transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
