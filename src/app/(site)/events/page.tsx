"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import { events } from "@/lib/demo-data";
import { formatEventDate } from "@/lib/utils";

export default function EventsPage() {
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
            What&apos;s Coming
          </motion.p>
          <AnimatedText
            text="Events & Workshops"
            as="h1"
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto"
          >
            Join me at upcoming exhibitions, workshops, and creative sessions.
          </motion.p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-20">
          {events.map((event, i) => {
            const date = formatEventDate(event.date);
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="bg-card border border-border rounded-sm p-6 md:p-8 hover:border-accent/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-accent/10 border border-accent/20 rounded-sm px-4 py-3 text-center shrink-0">
                    <span className="block text-accent text-3xl font-serif leading-none">
                      {date.day}
                    </span>
                    <span className="block text-accent/70 text-xs mt-1">
                      {date.month} {date.year}
                    </span>
                  </div>
                  <div>
                    <span className="inline-block bg-accent/10 text-accent text-xs uppercase tracking-wider px-2 py-0.5 rounded-sm mb-2">
                      {event.eventType}
                    </span>
                    <h3 className="text-foreground font-serif text-xl">{event.title}</h3>
                  </div>
                </div>

                <p className="text-foreground/60 text-sm leading-relaxed mb-6">
                  {event.description}
                </p>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent/60" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-accent/60" />
                    {event.date}
                    {event.endDate && event.endDate !== event.date && ` — ${event.endDate}`}
                  </span>
                </div>

                {event.registrationUrl && (
                  <a
                    href={event.registrationUrl}
                    className="inline-flex items-center gap-2 border border-accent text-accent px-6 py-2 text-xs uppercase tracking-[0.15em] hover:bg-accent hover:text-background transition-all duration-300"
                  >
                    Register <ExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
