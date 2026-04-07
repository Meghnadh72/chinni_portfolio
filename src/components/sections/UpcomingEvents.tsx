"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import { events } from "@/lib/demo-data";
import { formatEventDate } from "@/lib/utils";

export default function UpcomingEvents() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

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
            What&apos;s Next
          </motion.p>
          <AnimatedText
            text="Upcoming Events"
            as="h2"
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {events.map((event, i) => {
            const date = formatEventDate(event.date);
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="bg-card border border-border rounded-sm p-6 md:p-8 hover:border-accent/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-accent/10 border border-accent/20 rounded-sm px-3 py-2 text-center shrink-0">
                    <span className="block text-accent text-2xl font-serif leading-none">
                      {date.day}
                    </span>
                    <span className="block text-accent/70 text-xs mt-1">
                      {date.month}
                    </span>
                  </div>
                  <div>
                    <span className="inline-block bg-accent/10 text-accent text-xs uppercase tracking-wider px-2 py-0.5 rounded-sm mb-2">
                      {event.eventType}
                    </span>
                    <h3 className="text-foreground font-serif text-lg">{event.title}</h3>
                  </div>
                </div>

                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  {event.description}
                </p>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
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
                    className="inline-flex items-center gap-2 text-accent text-sm mt-4 hover:underline"
                  >
                    Register <ExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
