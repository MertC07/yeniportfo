"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Magnetic } from "@/components/ui/magnetic-button";
import { useContent } from "@/components/providers/locale-provider";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const { profile, ui } = useContent();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (permissions / old browser) — fall back to mail client
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Magnetic strength={0.2}>
      <button
        type="button"
        onClick={copy}
        className="group relative overflow-hidden rounded-full border hairline bg-surface px-8 py-5 transition-colors duration-300 hover:border-accent sm:px-12 sm:py-6"
      >
        <span className="sr-only" aria-live="polite">
          {copied ? ui.copyEmail.srCopied : `${ui.copyEmail.srCopy} ${profile.email}`}
        </span>
        <span aria-hidden className="block h-6 sm:h-7">
          <AnimatePresence mode="popLayout" initial={false}>
            {copied ? (
              <motion.span
                key="copied"
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.14em] text-accent sm:text-base"
              >
                {ui.copyEmail.copied}
              </motion.span>
            ) : (
              <motion.span
                key="email"
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 font-mono text-sm tracking-tight sm:text-base"
              >
                {profile.email}
                <span className="microlabel rounded-full border hairline px-2.5 py-1 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                  {ui.copyEmail.copy}
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>
    </Magnetic>
  );
}
