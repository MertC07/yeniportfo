"use client";

import { motion } from "motion/react";
import { useContent } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/ui/section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

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

      <ol className="mt-10">
        {certificates.map((certificate, i) => (
          <motion.li
            key={`${certificate.year}-${certificate.title}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-t hairline py-6 transition-colors duration-300 hover:bg-surface/60 sm:grid-cols-[3.5rem_1fr_auto] sm:px-4"
          >
            <span className="microlabel text-accent">0{i + 1}</span>
            <div>
              <h3 className="font-display text-xl font-bold sm:text-2xl">
                {certificate.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {certificate.issuer}
                {certificate.href && certificate.href !== "#" && (
                  <>
                    {" · "}
                    <a
                      href={certificate.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      {ui.sections.certificates.view}
                    </a>
                  </>
                )}
              </p>
            </div>
            <span className="microlabel">{certificate.year}</span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
