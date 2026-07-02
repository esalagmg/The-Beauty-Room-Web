import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { LogoEmblem } from "./logo-emblem";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/constants/site";
import { footerColumns } from "@/constants/nav";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-gradient text-cream">
      <div className="grain" />

      {/* Oversized marquee band */}
      <div className="border-b border-cream/10 py-10">
        <Marquee duration={38} className="text-cream/10">
          <span className="px-8 font-serif text-7xl font-light italic md:text-8xl">
            Book your transformation
          </span>
          <span className="px-8 text-gold/40">✦</span>
          <span className="px-8 font-serif text-7xl font-light italic text-gold/30 md:text-8xl">
            The Beauty Room by Nilu
          </span>
          <span className="px-8 text-gold/40">✦</span>
        </Marquee>
      </div>

      <div className="container py-20 pb-28 lg:pb-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <Reveal className="space-y-6">
            <LogoEmblem href="/" className="h-24 w-24" sizes="96px" />
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-cream/60">
              {siteConfig.description}
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
                { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
                { icon: Mail, href: siteConfig.contact.emailHref, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-all duration-500 hover:border-gold hover:text-gold-soft"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <Reveal key={col.title} className="space-y-5">
              <h4 className="font-sans text-[0.7rem] uppercase tracking-luxe text-gold/70">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-cream/70 transition-colors hover:text-cream"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          {/* Contact */}
          <Reveal className="space-y-5">
            <h4 className="font-sans text-[0.7rem] uppercase tracking-luxe text-gold/70">
              Visit us
            </h4>
            <ul className="space-y-4 text-sm text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/60" />
                <span>
                  {siteConfig.location.line1}
                  <br />
                  {siteConfig.location.line2}, {siteConfig.location.country}
                </span>
              </li>
              <li>
                <a href={siteConfig.contact.phoneHref} className="flex items-center gap-3 hover:text-cream">
                  <Phone className="h-4 w-4 text-gold/60" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={siteConfig.contact.emailHref} className="flex items-center gap-3 hover:text-cream">
                  <Mail className="h-4 w-4 text-gold/60" />
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="hairline mt-16" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-[0.7rem] uppercase tracking-wide2 text-cream/40 md:flex-row">
          <span>© 1998 The Beauty Room by Nilu</span>
          <span>
            Website Crafted by{" "}
            <a
              href="https://www.trivistalabs.io"
              target="_blank"
              rel="noreferrer"
              className="text-cream/60 underline-offset-4 transition-colors hover:text-cream hover:underline"
            >
              Trivista Labs (Pvt) Ltd
            </a>
          </span>
          <div className="flex gap-6">
            <Link href="/booking" className="hover:text-cream">
              Book
            </Link>
            <Link href="/#contact" className="hover:text-cream">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
