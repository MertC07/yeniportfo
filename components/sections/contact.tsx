"use client";

import { motion } from "motion/react";
import { profile, socials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealText } from "@/components/ui/reveal-text";
import { CopyEmailButton } from "@/components/ui/copy-email-button";

export function Contact() {
  return (
    <section id="contact" className="px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
      <SectionHeading index="07" label="Contact" meta="Replies within 24h" />

      <div className="mt-20 flex flex-col items-center text-center">
        <RevealText
          as="h2"
          lines={["Let's build", "something", "rare."]}
          className="font-display text-display-xl font-extrabold uppercase leading-[0.95] tracking-tight"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <CopyEmailButton />
          <a
            href={`mailto:${profile.email}`}
            className="microlabel transition-colors duration-300 hover:text-accent"
          >
            or write directly ↗
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
    </section>
  );
}
