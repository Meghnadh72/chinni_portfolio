"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import ImageReveal from "@/components/ui/ImageReveal";
import AnimatedText from "@/components/ui/AnimatedText";
import EditableField from "@/components/admin/EditableField";
import EditableImage from "@/components/admin/EditableImage";
import AchievementsEditor from "@/components/admin/AchievementsEditor";
import type { Photographer } from "@/lib/types";

export default function AboutPageClient({ photographer }: { photographer: Photographer }) {
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
            The Artist
          </motion.p>
          <EditableField table="cp_photographer" rowId="main" column="name" value={photographer.name}>
            <AnimatedText
              text={`About ${photographer.name}`}
              as="h1"
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground"
            />
          </EditableField>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20 md:mb-32">
          <EditableImage table="cp_photographer" rowId="main" column="portrait" value={photographer.portrait} folder="photographer">
            <ImageReveal
              src={photographer.portrait || "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=700&h=900&fit=crop"}
              alt={photographer.name}
              className="aspect-[3/4] rounded-sm sticky top-24"
            />
          </EditableImage>

          <div>
            <EditableField table="cp_photographer" rowId="main" column="full_bio" value={photographer.fullBio} multiline>
              {photographer.fullBio.split("\n\n").map((paragraph: string, i: number) => (
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
            </EditableField>

            <EditableField table="cp_photographer" rowId="main" column="philosophy" value={photographer.philosophy} multiline>
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
            </EditableField>
          </div>
        </div>

        <div className="mb-20 md:mb-32">
          <div className="text-center mb-12">
            <AnimatedText
              text="Achievements"
              as="h2"
              className="font-serif text-2xl md:text-3xl text-foreground"
            />
          </div>

          <AchievementsEditor achievements={photographer.achievements}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {photographer.achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="bg-card border border-border rounded-sm p-6 text-center hover:border-accent/30 transition-colors duration-300"
                >
                  <Award className="text-accent mx-auto mb-3" size={28} />
                  <p className="text-accent text-lg font-serif mb-1">{achievement.title}</p>
                  <p className="text-foreground/60 text-sm">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </AchievementsEditor>
        </div>
      </div>
    </div>
  );
}
