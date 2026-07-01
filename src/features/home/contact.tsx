"use client";

import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "./contact-form";
import { siteConfig } from "@/constants/site";

export function Contact() {
  const mapSrc = siteConfig.location.mapEmbed;

  return (
    <Section id="contact" tone="clinic" className="overflow-hidden">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* left — info */}
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <Reveal>
            <h2 className="mt-5 max-w-md font-serif text-display-sm font-light leading-[1.04] text-graphite">
              Begin your <span className="italic text-gold-foil">visit</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-charcoal/75">
              Reserve an appointment, request a consultation or simply say hello.
              Our team responds within a few hours.
            </p>
          </Reveal>

          {/* contact tiles */}
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <ContactTile
              icon={MapPin}
              label="Visit"
              value={`${siteConfig.location.line1}, ${siteConfig.location.line2}`}
              href={siteConfig.location.mapLink}
            />
            <ContactTile
              icon={Phone}
              label="Call"
              value={siteConfig.contact.phone}
              href={siteConfig.contact.phoneHref}
            />
            <ContactTile
              icon={MessageCircle}
              label="WhatsApp"
              value={siteConfig.contact.whatsapp}
              href={siteConfig.contact.whatsappHref}
            />
            <ContactTile
              icon={Mail}
              label="Email"
              value={siteConfig.contact.email}
              href={siteConfig.contact.emailHref}
            />
          </div>

          {/* hours */}
          <div className="mt-7 rounded-3xl border border-stone/50 bg-white/50 p-6">
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-gold-deep" />
              <span className="font-sans text-[0.65rem] uppercase tracking-luxe text-gold-deep">
                Opening hours
              </span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between border-b border-stone/30 pb-2.5 text-sm text-charcoal/80 last:border-0 last:pb-0"
                >
                  <span>{h.day}</span>
                  <span className="font-medium text-graphite">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* map */}
          <div className="mt-6 h-56 overflow-hidden rounded-3xl border border-stone/50 shadow-soft">
            <iframe
              title="The Beauty Room location"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale-[0.3]"
            />
          </div>
        </div>

        {/* right — form */}
        <Reveal direction="up" className="lg:pt-12">
          <div className="rounded-[36px] border border-stone/40 bg-white/60 p-7 shadow-luxe backdrop-blur md:p-10">
            <h3 className="font-serif text-3xl font-light text-graphite">
              Send us a note
            </h3>
            <p className="mt-2 text-sm text-charcoal/70">
              Prefer to book instantly? Use our{" "}
              <a href="/booking" className="text-gold-deep underline-offset-4 hover:underline">
                booking experience
              </a>
              .
            </p>
            <div className="mt-7">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ContactTile({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start gap-3 rounded-3xl border border-stone/50 bg-white/40 p-5 transition-colors duration-400 hover:border-gold/60 hover:bg-white/70"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-graphite/5 text-gold-deep transition-colors group-hover:bg-gold group-hover:text-cream">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block font-sans text-[0.58rem] uppercase tracking-wide2 text-taupe">
          {label}
        </span>
        <span className="mt-0.5 block truncate font-sans text-sm text-graphite">
          {value}
        </span>
      </span>
    </a>
  );
}
