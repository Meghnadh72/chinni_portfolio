import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { siteSettings } from "@/lib/demo-data";

const navLinks = [
  { href: "/works", label: "Works" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-foreground font-serif text-2xl tracking-wider">
              {siteSettings.siteName}
            </Link>
            <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
              {siteSettings.tagline}
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
                href={`mailto:${siteSettings.contactEmail}`}
                className="text-muted-foreground hover:text-accent text-sm transition-colors flex items-center gap-2"
              >
                <Mail size={14} />
                {siteSettings.contactEmail}
              </a>
              <a
                href={`tel:${siteSettings.contactPhone}`}
                className="text-muted-foreground hover:text-accent text-sm transition-colors flex items-center gap-2"
              >
                <Phone size={14} />
                {siteSettings.contactPhone}
              </a>
              <p className="text-muted-foreground text-sm flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                {siteSettings.address}
              </p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-foreground text-sm uppercase tracking-[0.2em] mb-4">
              Follow
            </h4>
            <div className="flex gap-4">
              <a
                href={siteSettings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href={siteSettings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href={siteSettings.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} {siteSettings.siteName}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Crafted with passion
          </p>
        </div>
      </div>
    </footer>
  );
}
