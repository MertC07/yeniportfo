/**
 * Single source of truth for all site content.
 * Edit this file to replace the placeholder content with your own.
 */

export const profile = {
  name: "Mert Ceren",
  monogram: "MC",
  role: "Creative Developer",
  tagline: "Building digital products where engineering meets craft.",
  location: "Istanbul, Türkiye",
  timezone: "Europe/Istanbul",
  email: "mertceren.2004.mc@gmail.com",
  available: true,
  availabilityNote: "Open to freelance & full-time",
};

export const heroStatement = {
  lines: ["Code with", "intent.", "Design with", "restraint."],
  sub: "I design and build interfaces that feel inevitable — fast, precise, and quietly memorable.",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/mertceren" }, // EDIT: your GitHub
  { label: "LinkedIn", href: "https://linkedin.com/in/mertceren" }, // EDIT: your LinkedIn
  { label: "X", href: "https://x.com/mertceren" }, // EDIT: your X
] as const;

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  /** Colors driving the CSS-generated visual for each card. */
  palette: { from: string; via: string; to: string };
};

export const projects: Project[] = [
  {
    slug: "aurora",
    title: "Aurora",
    year: "2026",
    category: "SaaS · Analytics",
    description:
      "A real-time analytics platform rebuilt around clarity: streaming dashboards, sub-second queries, and a design system that scales from a widget to a wall display.",
    tags: ["Next.js", "TypeScript", "WebSockets", "Design System"],
    href: "#", // EDIT: live URL or case study link
    palette: { from: "#FF4D00", via: "#7C2D8E", to: "#1B1035" },
  },
  {
    slug: "tempo",
    title: "Tempo",
    year: "2025",
    category: "Fintech · Mobile Web",
    description:
      "A personal finance companion that turns transaction noise into rhythm — budgets that adapt weekly, insights written in plain language, zero charts you have to squint at.",
    tags: ["React", "PWA", "Node.js", "PostgreSQL"],
    href: "#",
    palette: { from: "#0E7C5B", via: "#123B33", to: "#06110E" },
  },
  {
    slug: "atlas",
    title: "Atlas",
    year: "2025",
    category: "Travel · Web Platform",
    description:
      "An editorial travel journal with map-driven storytelling. Routes render as living ink lines; every trip becomes a scrollable film of places, notes, and light.",
    tags: ["Next.js", "Mapbox GL", "Motion", "CMS"],
    href: "#",
    palette: { from: "#2952E3", via: "#14224F", to: "#080B18" },
  },
  {
    slug: "pulse",
    title: "Pulse",
    year: "2024",
    category: "Health · Product Design",
    description:
      "A training log that respects your attention: one screen, one week, one honest trend line. Built for athletes who want signal, not gamification.",
    tags: ["React Native Web", "TypeScript", "Charts", "A11y"],
    href: "#",
    palette: { from: "#E0B100", via: "#6E4A0A", to: "#171004" },
  },
];

export const about = {
  manifesto:
    "I believe the best interfaces disappear — what remains is the feeling of things simply working.",
  paragraphs: [
    "I started building for the web the way most people start collecting obsessions: one view-source at a time. What began as curiosity became a discipline — shipping products where performance budgets and typography get equal respect.",
    "Today I work across the stack, but my center of gravity is the front of the frontend: motion, interaction, and the last 10% of polish that separates software people use from software people remember.",
  ],
};

export type ExperienceEntry = {
  period: string;
  title: string;
  place: string;
  summary: string;
  detail: string;
};

export const experience: ExperienceEntry[] = [
  {
    period: "2025 — Now",
    title: "Freelance Creative Developer",
    place: "Independent",
    summary: "End-to-end product builds for founders and studios.",
    detail:
      "Designing and shipping marketing sites, dashboards, and interactive experiences. Owning everything from concept and art direction to deployment and Core Web Vitals.",
  },
  {
    period: "2024 — 2025",
    title: "Frontend Developer Intern",
    place: "Studio Nord",
    summary: "Production React work on a design-led team.",
    detail:
      "Built component libraries and motion systems used across three client products. Learned that code review is a design discipline too.",
  },
  {
    period: "2023 — 2024",
    title: "First Client Projects",
    place: "Self-taught era",
    summary: "Local businesses, real deadlines, real users.",
    detail:
      "Shipped my first paid work: sites for a coffee roaster and a photography duo. Small budgets, big lessons in scope, communication, and shipping.",
  },
  {
    period: "2022",
    title: "Computer Engineering",
    place: "University",
    summary: "Where the fundamentals clicked.",
    detail:
      "Algorithms, systems, and the habit of asking why something works — not just how. Still the lens I debug through.",
  },
];

export type Skill = {
  name: string;
  discipline: "Frontend" | "Motion" | "Backend" | "Tooling";
  note: string;
};

export type SkillTier = {
  tier: string;
  blurb: string;
  skills: Skill[];
};

export const skillTiers: SkillTier[] = [
  {
    tier: "Core",
    blurb: "Daily drivers. The tools I think in.",
    skills: [
      { name: "TypeScript", discipline: "Frontend", note: "Types first, always" },
      { name: "React", discipline: "Frontend", note: "Since hooks were new" },
      { name: "Next.js", discipline: "Frontend", note: "App Router native" },
      { name: "Tailwind CSS", discipline: "Frontend", note: "Design tokens included" },
      { name: "Motion", discipline: "Motion", note: "60fps or it ships not" },
    ],
  },
  {
    tier: "Fluent",
    blurb: "Comfortable at production depth.",
    skills: [
      { name: "Node.js", discipline: "Backend", note: "APIs & tooling" },
      { name: "PostgreSQL", discipline: "Backend", note: "Schema as design" },
      { name: "GSAP", discipline: "Motion", note: "Timeline heavy lifting" },
      { name: "Figma", discipline: "Tooling", note: "Where builds begin" },
      { name: "Git", discipline: "Tooling", note: "Atomic commits, honest messages" },
    ],
  },
  {
    tier: "Exploring",
    blurb: "Current curiosities, growing fast.",
    skills: [
      { name: "WebGL / Shaders", discipline: "Motion", note: "Light as material" },
      { name: "Rust", discipline: "Backend", note: "Weekend systems brain" },
      { name: "AI Tooling", discipline: "Tooling", note: "Agents in the workflow" },
    ],
  },
];

export const techMarquee = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Motion",
  "GSAP",
  "Node.js",
  "PostgreSQL",
  "Figma",
  "Vercel",
  "Git",
  "WebGL",
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Mert has that rare combination: an engineer's rigor and a designer's eye. He shipped our dashboard rebuild two weeks early — and the polish was what everyone noticed.",
    name: "Elif Kaya",
    role: "Product Lead, Aurora",
  },
  {
    quote:
      "Working with him felt like adding three people to the team. Motion, performance, accessibility — nothing was ever someone else's job.",
    name: "Jonas Weber",
    role: "Founder, Studio Nord",
  },
  {
    quote:
      "The site didn't just look premium — it converted. Bounce rate dropped by a third in the first month after launch.",
    name: "Selin Arslan",
    role: "Marketing Director, Tempo",
  },
];

export type Award = {
  year: string;
  title: string;
  issuer: string;
  project: string;
};

export const awards: Award[] = [
  { year: "2026", title: "Site of the Day", issuer: "Awwwards", project: "Aurora" },
  { year: "2026", title: "Best UI Design", issuer: "CSS Design Awards", project: "Atlas" },
  { year: "2025", title: "Honorable Mention", issuer: "Awwwards", project: "Tempo" },
  { year: "2025", title: "FWA of the Day", issuer: "The FWA", project: "Atlas" },
];

export type Post = {
  title: string;
  date: string;
  readingTime: string;
  tag: string;
  excerpt: string;
  href: string;
};

export const posts: Post[] = [
  {
    title: "The last 10% is the product",
    date: "Jun 2026",
    readingTime: "6 min",
    tag: "Craft",
    excerpt:
      "Why polish isn't decoration — it's the difference between software people use and software people remember.",
    href: "#", // EDIT: link to the real post
  },
  {
    title: "Scroll is a storytelling medium",
    date: "Apr 2026",
    readingTime: "8 min",
    tag: "Motion",
    excerpt:
      "Sticky scenes, velocity, and restraint: how to choreograph a page without exhausting the reader.",
    href: "#",
  },
  {
    title: "Design tokens that survive a redesign",
    date: "Feb 2026",
    readingTime: "5 min",
    tag: "Systems",
    excerpt:
      "A small vocabulary of variables kept three projects consistent — here's the naming that actually worked.",
    href: "#",
  },
];

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export const site = {
  url: "https://mertceren.dev", // EDIT: your domain
  title: "Mert Ceren — Creative Developer",
  description:
    "Portfolio of Mert Ceren, a creative developer building fast, precise, quietly memorable digital products.",
};
