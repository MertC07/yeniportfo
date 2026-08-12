/**
 * Locale plumbing: bundles the English (lib/data.ts) and Turkish
 * (lib/data.tr.ts) content behind getContent(), plus URL helpers.
 * Turkish is the default and lives at the root URLs, English under /en.
 */

import * as en from "./data";
import * as tr from "./data.tr";
import type { ExperienceEntry, Project, SkillTier, Ui } from "./data";

export const locales = ["en", "tr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

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
  site: typeof en.site;
  ui: Ui;
  awards: typeof en.awards;
  certificates: typeof en.certificates;
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
    site: en.site,
    ui: en.ui,
    awards: en.awards,
    certificates: en.certificates,
  },
  tr: {
    profile: tr.profile,
    heroStatement: tr.heroStatement,
    navItems: tr.navItems,
    projects: tr.projects,
    about: tr.about,
    experience: tr.experience,
    skillTiers: tr.skillTiers,
    site: tr.site,
    ui: tr.ui,
    awards: tr.awards,
    certificates: tr.certificates,
  },
};

export function getContent(locale: Locale): Content {
  return bundles[locale];
}

/**
 * Turkish is the default and lives at the root URLs; English is prefixed.
 * "/" → "/en", "/work/x" → "/en/work/x" for English; unchanged for Turkish.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === "tr") return path;
  return path === "/" ? "/en" : `/en${path}`;
}
