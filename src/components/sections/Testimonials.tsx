"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { testimonials } from "@/lib/demo-data";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

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
            Testimonials
          </motion.p>
          <AnimatedText
            text="Stories We've Told"
            as="h2"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground"
          />
        </div>

        {/* Scrollable container on mobile, grid on larger screens */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {testimonials.slice(0, 3).map((testimonial, i) => (
            <motion.div
              key={testimonial.clientName}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-center"
            >
              <TestimonialCard
                clientName={testimonial.clientName}
                clientRole={testimonial.clientRole}
                quote={testimonial.quote}
                rating={testimonial.rating}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
