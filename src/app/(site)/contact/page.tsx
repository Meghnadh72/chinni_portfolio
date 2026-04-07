"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import AnimatedText from "@/components/ui/AnimatedText";
import { siteSettings, services } from "@/lib/demo-data";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to /api/contact
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
            Get In Touch
          </motion.p>
          <AnimatedText
            text="Let's Work Together"
            as="h1"
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto"
          >
            Have a project in mind? I&apos;d love to hear about it. Fill out the form below or
            reach out directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 pb-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="bg-card border border-accent/30 rounded-sm p-10 text-center">
                <CheckCircle className="text-accent mx-auto mb-4" size={48} />
                <h3 className="font-serif text-2xl text-foreground mb-2">Thank You!</h3>
                <p className="text-foreground/60">
                  Your message has been sent. I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-foreground/70 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-foreground/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm text-foreground/70 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm text-foreground/70 mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.title}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-foreground/70 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-card border border-border rounded-sm px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-accent text-background px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-accent-light transition-colors duration-300"
                >
                  <Send size={14} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-foreground font-serif text-xl mb-4">Contact Details</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${siteSettings.contactEmail}`}
                  className="flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors"
                >
                  <Mail size={18} className="text-accent/60 shrink-0" />
                  <span className="text-sm">{siteSettings.contactEmail}</span>
                </a>
                <a
                  href={`tel:${siteSettings.contactPhone}`}
                  className="flex items-center gap-3 text-foreground/70 hover:text-accent transition-colors"
                >
                  <Phone size={18} className="text-accent/60 shrink-0" />
                  <span className="text-sm">{siteSettings.contactPhone}</span>
                </a>
                <div className="flex items-start gap-3 text-foreground/70">
                  <MapPin size={18} className="text-accent/60 mt-0.5 shrink-0" />
                  <span className="text-sm">{siteSettings.address}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-foreground font-serif text-xl mb-4">Follow Along</h3>
              <div className="flex gap-4">
                <a
                  href={siteSettings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border p-3 rounded-sm text-muted-foreground hover:text-accent hover:border-accent/30 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon size={20} />
                </a>
                <a
                  href={siteSettings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border p-3 rounded-sm text-muted-foreground hover:text-accent hover:border-accent/30 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FacebookIcon size={20} />
                </a>
                <a
                  href={siteSettings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card border border-border p-3 rounded-sm text-muted-foreground hover:text-accent hover:border-accent/30 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <YoutubeIcon size={20} />
                </a>
              </div>
            </div>

            <div className="bg-card border border-border rounded-sm p-6">
              <h3 className="text-foreground font-serif text-lg mb-2">Response Time</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                I typically respond within 24 hours. For urgent inquiries, feel free to reach
                out via WhatsApp for a quicker response.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
