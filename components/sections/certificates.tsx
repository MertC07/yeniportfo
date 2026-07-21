"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useContent } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Certificate } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

/** How many cards show initially, and how many each click adds. */
const BATCH = 5;

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

type CardProps = {
  certificate: Certificate;
  /** Staggered entrance index within its own batch. */
  index: number;
  /** Cards past the fold animate on mount; the first batch waits for scroll. */
  revealOnMount: boolean;
  viewLabel: string;
};

function CertificateCard({ certificate, index, revealOnMount, viewLabel }: CardProps) {
  const hasLink = Boolean(certificate.href && certificate.href !== "#");
  const entrance = { opacity: 1, y: 0 };
  const transition = { duration: 0.6, delay: index * 0.06, ease: EASE };

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      {...(revealOnMount
        ? { animate: entrance }
        : {
            whileInView: entrance,
            viewport: { once: true, margin: "-10% 0px" },
          })}
      transition={transition}
      className="group relative flex flex-col justify-between gap-4 rounded-xl border hairline bg-surface/50 p-5 transition-[transform,border-color] duration-400 hover:-translate-y-1 hover:border-accent/60"
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
            {hasLink ? (
              /* The overlay makes the whole card one click target while the
                 link keeps the title as its accessible name. */
              <a
                href={certificate.href}
                target="_blank"
                rel="noopener noreferrer"
                className="after:absolute after:inset-0 after:rounded-xl after:content-['']"
              >
                {certificate.title}
              </a>
            ) : (
              certificate.title
            )}
          </h3>
          <p className="mt-1 text-sm text-muted">{certificate.issuer}</p>
        </div>
      </div>

      <div className="microlabel flex items-baseline justify-between gap-3 border-t hairline pt-3">
        <span>{certificate.issued}</span>
        {hasLink && (
          <span
            aria-hidden
            className="text-foreground transition-colors duration-300 group-hover:text-accent"
          >
            {viewLabel}
          </span>
        )}
      </div>
    </motion.li>
  );
}

export function Certificates() {
  const { certificates, ui } = useContent();
  const [visible, setVisible] = useState(BATCH);

  if (!certificates.length) return null;

  const copy = ui.sections.certificates;
  const total = certificates.length;
  const shown = certificates.slice(0, visible);
  const allShown = visible >= total;

  return (
    <section id="certificates" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <SectionHeading index="05" label={copy.label} meta={copy.meta} />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((certificate, i) => (
          <CertificateCard
            key={`${certificate.issued}-${certificate.title}`}
            certificate={certificate}
            // Cards in the newest batch stagger from 0; earlier ones sit still.
            index={i % BATCH}
            revealOnMount={i >= BATCH}
            viewLabel={copy.view}
          />
        ))}
      </ul>

      {total > BATCH && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible(allShown ? BATCH : visible + BATCH)}
            aria-expanded={allShown}
            aria-controls="certificates"
            className="microlabel rounded-full border hairline px-6 py-3 text-foreground transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink"
          >
            {allShown ? copy.showLess : copy.showMore}
          </button>
        </div>
      )}
    </section>
  );
}
