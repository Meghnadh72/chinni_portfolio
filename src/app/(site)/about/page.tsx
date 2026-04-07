"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import ImageReveal from "@/components/ui/ImageReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import { photographer } from "@/lib/demo-data";

export default function AboutPage() {
  return (
    <div className="pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent text-xs uppercase tracking-[0.3em] mb-4"
          >
            The Artist
          </motion.p>
          <AnimatedText
            text={`About ${photographer.name}`}
            as="h1"
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground"
          />
        </div>

        {/* Portrait + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20 md:mb-32">
          <ImageReveal
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&h=900&fit=crop"
            alt={photographer.name}
            className="aspect-[3/4] rounded-sm sticky top-24"
          />

          <div>
            {photographer.fullBio.split("\n\n").map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="text-foreground/70 text-base md:text-lg leading-relaxed mb-6"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Philosophy quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border-l-2 border-accent pl-6 my-10"
            >
              <p className="text-foreground/80 italic font-serif text-xl md:text-2xl leading-relaxed">
                &ldquo;{photographer.philosophy}&rdquo;
              </p>
            </motion.blockquote>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20 md:mb-32">
          <div className="text-center mb-12">
            <AnimatedText
              text="Achievements"
              as="h2"
              className="font-serif text-2xl md:text-3xl text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {photographer.achievements.map((achievement, i) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="bg-card border border-border rounded-sm p-6 text-center hover:border-accent/30 transition-colors duration-300"
              >
                <Award className="text-accent mx-auto mb-3" size={28} />
                <p className="text-foreground text-sm font-medium">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
