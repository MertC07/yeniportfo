"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { socials } from "@/lib/data";
import { useContent, useLocale } from "@/components/providers/locale-provider";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealText } from "@/components/ui/reveal-text";
import { CopyEmailButton } from "@/components/ui/copy-email-button";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Contact() {
  const { profile, ui } = useContent();
  const locale = useLocale();
  const isTr = locale === "tr";
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCvModalOpen) {
        setIsCvModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCvModalOpen]);

  useEffect(() => {
    if (isCvModalOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isCvModalOpen]);

  return (
    <section id="contact" className="px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
      <SectionHeading
        index="07"
        label={ui.sections.contact.label}
        meta={ui.sections.contact.meta}
      />

      <div className="mt-20 flex flex-col items-center text-center">
        <RevealText
          as="h2"
          lines={ui.sections.contact.lines}
          className="font-display text-display-xl font-extrabold uppercase leading-[0.95] tracking-tight"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <CopyEmailButton />
            
            {/* CV PREVIEW & DOWNLOAD BUTTON */}
            <button
              type="button"
              onClick={() => setIsCvModalOpen(true)}
              className="group relative inline-flex items-center gap-2.5 rounded-full border border-accent/60 bg-accent/10 px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink hover:shadow-lg hover:shadow-accent/20 cursor-pointer"
            >
              <svg
                className="h-4 w-4 text-accent group-hover:text-accent-ink transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>{isTr ? "Özgeçmişi İncele & İndir (PDF)" : "Preview & Download Resume (PDF)"}</span>
            </button>
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="microlabel transition-colors duration-300 hover:text-accent"
          >
            {ui.sections.contact.orWrite}
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8"
        >
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="microlabel relative text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
              >
                {social.label}
              </a>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* FULL-SCREEN CV PREVIEW MODAL */}
      <AnimatePresence>
        {isCvModalOpen && (
          <motion.div
            key="cv-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCvModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative z-10 flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border hairline bg-surface/95 shadow-2xl backdrop-blur-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b hairline p-5 sm:p-6 bg-surface/80">
                <div>
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    {profile.name} — {isTr ? "Özgeçmiş (CV)" : "Curriculum Vitae"}
                  </h3>
                  <p className="mt-1 text-xs text-muted font-mono">
                    {profile.role} · {profile.location}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCvModalOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border hairline bg-surface/90 text-foreground transition-colors hover:border-accent hover:text-accent"
                  aria-label="Kapat"
                >
                  ✕
                </button>
              </div>

              {/* CV Preview Document View */}
              <div className="my-2 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 bg-black/60 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Mert_Ceren_CV.jpg"
                  alt={`${profile.name} Özgeçmiş CV`}
                  className="max-h-[72vh] w-auto object-contain rounded-xl shadow-2xl border hairline"
                />
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t hairline p-4 sm:px-6 bg-surface/80">
                <span className="text-xs text-muted text-center sm:text-left font-mono">
                  {isTr ? "ESC veya dokunarak kapatabilirsiniz" : "Press ESC or click outside to close"}
                </span>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/Mert_Ceren_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="microlabel inline-flex items-center gap-2 rounded-full border hairline px-5 py-2.5 text-xs text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    <span>{isTr ? "Yeni Sekmede Aç ↗" : "Open in New Tab ↗"}</span>
                  </a>
                  
                  <a
                    href="/Mert_Ceren_CV.pdf"
                    download="Mert_Ceren_CV.pdf"
                    className="microlabel inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink transition-opacity hover:opacity-90 shadow-md shadow-accent/20"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{isTr ? "PDF İndir 📥" : "Download PDF 📥"}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
