"use client";

import { motion } from "motion/react";
import { useContent } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/ui/section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

const STOPWORDS = new Set(["ve", "and", "of", "the", "for"]);

/**
 * Issuers without a logo file fall back to a short mark, so every card keeps
 * the same shape. An issuer that already leads with an acronym (BTK, BANÜ)
 * keeps it; otherwise the first letters of its significant words are used.
 */
function initials(issuer: string) {
  const words = issuer
    .replace(/[()]/g, " ")
    .split(/[\s-]+/)
    .filter((word) => /[a-zA-ZçğıöşüÇĞİÖŞÜ]/.test(word));

  const [first] = words;
  if (first && first.length >= 2 && first.length <= 5 && first === first.toLocaleUpperCase("tr")) {
    return first;
  }

  return words
    .filter((word) => !STOPWORDS.has(word.toLocaleLowerCase("tr")))
    .slice(0, 3)
    .map((word) => word[0].toLocaleUpperCase("tr"))
    .join("");
}

export function Certificates() {
  const { certificates, ui } = useContent();

  if (!certificates.length) return null;

  return (
    <section id="certificates" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading
        index="05"
        label={ui.sections.certificates.label}
        meta={ui.sections.certificates.meta}
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, i) => (
          <motion.li
            key={`${certificate.issued}-${certificate.title}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
            className="group flex flex-col justify-between gap-4 rounded-xl border hairline bg-surface/50 p-5 transition-[transform,border-color] duration-400 hover:-translate-y-1 hover:border-accent/60"
          >
            <div className="flex items-start gap-4">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border hairline bg-surface/80 p-1.5 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-accent/40">
                {certificate.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={certificate.logo}
                    alt={certificate.issuer}
                    className="h-full w-full rounded-lg object-contain"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="font-mono text-[0.625rem] font-medium tracking-tight text-muted"
                  >
                    {initials(certificate.issuer)}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold leading-tight">
                  {certificate.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{certificate.issuer}</p>
              </div>
            </div>

            <div className="microlabel flex items-baseline justify-between gap-3 border-t hairline pt-3">
              <span>{certificate.issued}</span>
              {certificate.href && certificate.href !== "#" && (
                <a
                  href={certificate.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors duration-300 group-hover:text-accent"
                >
                  {ui.sections.certificates.view}
                </a>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
