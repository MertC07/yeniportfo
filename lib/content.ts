/**
 * Locale plumbing: bundles the English (lib/data.ts) and Turkish
 * (lib/data.tr.ts) content behind getContent(), plus URL helpers.
 * English lives at the root URLs, Turkish under /tr.
 */

import * as en from "./data";
import * as tr from "./data.tr";
import type { ExperienceEntry, Post, Project, SkillTier, Ui } from "./data";

export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export type Content = {
  profile: typeof en.profile;
  heroStatement: { lines: string[]; sub: string };
  navItems: ReadonlyArray<{ label: string; href: string }>;
  projects: Project[];
  about: { manifesto: string; paragraphs: string[] };
  experience: ExperienceEntry[];
  skillTiers: SkillTier[];
  posts: Post[];
  site: typeof en.site;
  ui: Ui;
  testimonials: typeof en.testimonials;
  awards: typeof en.awards;
};

const bundles: Record<Locale, Content> = {
  en: {
    profile: en.profile,
    heroStatement: en.heroStatement,
    navItems: en.navItems,
    projects: en.projects,
    about: en.about,
    experience: en.experience,
    skillTiers: en.skillTiers,
    posts: en.posts,
    site: en.site,
    ui: en.ui,
    testimonials: en.testimonials,
    awards: en.awards,
  },
  tr: {
    profile: tr.profile,
    heroStatement: tr.heroStatement,
    navItems: tr.navItems,
    projects: tr.projects,
    about: tr.about,
    experience: tr.experience,
    skillTiers: tr.skillTiers,
    posts: tr.posts,
    site: tr.site,
    ui: tr.ui,
    testimonials: tr.testimonials,
    awards: tr.awards,
  },
};

export function getContent(locale: Locale): Content {
  return bundles[locale];
}

/** Prefix a root-relative path for the given locale: "/" → "/tr", "/work/x" → "/tr/work/x". */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en") return path;
  return path === "/" ? "/tr" : `/tr${path}`;
}
