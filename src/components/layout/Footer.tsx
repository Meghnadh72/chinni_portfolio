import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import type { SiteSettings } from "@/lib/types";

const navLinks = [
  { href: "/works", label: "Works" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-foreground font-serif text-2xl tracking-wider">
              {settings.siteName}
            </Link>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              {settings.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-foreground text-sm uppercase tracking-[0.2em] mb-4">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-accent text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground text-sm uppercase tracking-[0.2em] mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-muted-foreground hover:text-accent text-sm transition-colors flex items-center gap-2"
              >
                <Mail size={14} />
                {settings.contactEmail}
              </a>
              <a
                href={`tel:${settings.contactPhone}`}
                className="text-muted-foreground hover:text-accent text-sm transition-colors flex items-center gap-2"
              >
                <Phone size={14} />
                {settings.contactPhone}
              </a>
              <p className="text-muted-foreground text-sm flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                {settings.address}
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-foreground text-sm uppercase tracking-[0.2em] mb-4">
              Follow
            </h4>
            <div className="flex gap-4">
              <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook">
                <FacebookIcon size={20} />
              </a>
              <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="YouTube">
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Crafted with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
