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
  caseStudy: {
    intro: string;
    facts: Array<{ label: string; value: string }>;
    challenge: string;
    approach: string;
    outcome: string;
  };
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
    href: "#", // EDIT: live site URL (shown as "Visit live" on the case page)
    palette: { from: "#FF4D00", via: "#7C2D8E", to: "#1B1035" },
    caseStudy: {
      intro:
        "When every dashboard in the industry looks the same, clarity becomes the differentiator. Aurora bet everything on it.",
      facts: [
        { label: "Role", value: "Design & Frontend Lead" },
        { label: "Timeline", value: "10 weeks" },
        { label: "Team", value: "3 engineers, 1 PM" },
      ],
      challenge:
        "The legacy dashboard rendered 40+ widgets per view and users still exported to spreadsheets to answer basic questions. Query latency averaged four seconds, and every team had built their own inconsistent view. The rebuild had to be faster than the spreadsheet habit it was replacing.",
      approach:
        "We started by deleting: user interviews showed 80% of decisions relied on six metrics. Those six became full-bleed, real-time panels streamed over WebSockets; everything else moved behind progressive disclosure. A token-driven design system kept the same components legible from a phone to a wall-mounted display.",
      outcome:
        "Median time-to-answer dropped from minutes to seconds, spreadsheet exports fell by two thirds, and the design system shipped three more internal tools within the quarter. The wall display became the office's default screen — the strongest adoption signal we could ask for.",
    },
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
    caseStudy: {
      intro:
        "Personal finance apps drown people in charts. Tempo asked a quieter question: what would money feel like as a rhythm?",
      facts: [
        { label: "Role", value: "Full-stack Developer" },
        { label: "Timeline", value: "8 weeks" },
        { label: "Platform", value: "PWA, offline-first" },
      ],
      challenge:
        "Users abandoned budgeting apps within three weeks — not from lack of data, but from shame-driven design: red numbers, warning badges, guilt. Retention required an interface that informed without scolding, and worked offline on low-end phones.",
      approach:
        "We replaced charts with sentences: 'You usually spend more on Fridays. This week you didn't.' Budgets adapt weekly instead of punishing overshoots, and the whole app is one vertical timeline. A service-worker-first architecture made it installable and instant even on 3G.",
      outcome:
        "Week-four retention doubled against the previous app, and the plain-language insights became the most shared feature. The zero-chart constraint — the riskiest decision — ended up defining the product's voice.",
    },
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
    caseStudy: {
      intro:
        "Travel journals are either spreadsheets with photos or photo dumps without story. Atlas treats every trip as a film.",
      facts: [
        { label: "Role", value: "Creative Developer" },
        { label: "Timeline", value: "12 weeks" },
        { label: "Highlight", value: "Map-driven scrollytelling" },
      ],
      challenge:
        "Routes, notes, and photos lived in three different apps and none of them told the story of a trip. The brief: make the map the narrative spine — without turning the page into a heavy GIS tool that chokes a mid-range phone.",
      approach:
        "Scroll drives everything: as the reader moves through entries, the route draws itself as a living ink line and the camera glides between places. We budgeted strictly — one WebGL context, vector tiles only on demand, entries streamed from the CMS — to keep 60fps on mid-range devices.",
      outcome:
        "Average session length tripled compared to the gallery-style prototype, and shared trip links became the primary growth loop. The ink-line route animation became the product's signature — and its app-store screenshot.",
    },
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
    caseStudy: {
      intro:
        "Fitness apps gamify everything until nothing means anything. Pulse was built for athletes who want the truth, fast.",
      facts: [
        { label: "Role", value: "Frontend Developer" },
        { label: "Timeline", value: "6 weeks" },
        { label: "Focus", value: "Accessibility (WCAG AA)" },
      ],
      challenge:
        "Competing trackers buried the one question that matters — 'am I progressing?' — under streaks, badges, and confetti. Serious athletes churned to paper logs. The product had to earn daily use with signal, not dopamine.",
      approach:
        "One screen, one week, one honest trend line. Logging a session takes three taps; the trend line is computed from load, not vibes. Every interaction is keyboard- and screen-reader-complete — an accessibility pass that also made the whole UI faster to navigate for everyone.",
      outcome:
        "The three-tap log flow hit a 92% next-week retention among test athletes, and the a11y work shipped as the team's reference implementation. No confetti was harmed — none was ever added.",
    },
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
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tag: string;
  excerpt: string;
  /** Article paragraphs, rendered on /journal/[slug]. */
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "the-last-10-percent",
    title: "The last 10% is the product",
    date: "Jun 2026",
    readingTime: "6 min",
    tag: "Craft",
    excerpt:
      "Why polish isn't decoration — it's the difference between software people use and software people remember.",
    body: [
      "Every project has a moment where it technically works. The data loads, the buttons do what the labels promise, the tests are green. Most teams ship here. It's also the exact moment the real product work begins.",
      "The last 10% is not visual garnish. It's the 80ms of easing that makes a panel feel physical instead of teleported. It's the empty state that explains instead of apologizes. It's the focus ring that proves someone imagined a keyboard user before the audit forced them to.",
      "Users can't name these details — that's the point. Nobody leaves a review praising your interpolation curve. But they feel the accumulation, and they describe it with words like 'solid' and 'fast' and 'nice', which are the words that get products recommended.",
      "The uncomfortable implication: polish can't be a phase at the end of the roadmap, because it isn't a coat of paint — it's load-bearing. The projects I'm proudest of budgeted the last 10% from the first week. The ones I regret treated it as slack to be reclaimed when the deadline got loud.",
      "So my rule now is simple. When someone asks what's left, I don't say 'it works, just needs polish.' I say the product isn't built yet. Because the part that's missing is the part people will actually remember.",
    ],
  },
  {
    slug: "scroll-is-a-storytelling-medium",
    title: "Scroll is a storytelling medium",
    date: "Apr 2026",
    readingTime: "8 min",
    tag: "Motion",
    excerpt:
      "Sticky scenes, velocity, and restraint: how to choreograph a page without exhausting the reader.",
    body: [
      "Scroll is the only input every visitor already knows. No tutorial, no affordance problem, no learning curve — just intent, measured in pixels. That makes it the cheapest storytelling device on the web, and the most abused.",
      "The failure mode is choreographing everything. When each paragraph slides, every image parallaxes, and the headline rebuilds itself letter by letter, motion stops being information and becomes weather. The reader's eye learns to wait out the animation the way you wait out an unskippable ad.",
      "The fix is thinking in scenes, not effects. A film doesn't cut every second; it holds a shot until the meaning lands, then moves. Sticky sections are your holds. Reveals are your cuts. Velocity-reactive touches are your handheld camera — used once or twice, they make the page feel alive; used everywhere, they induce seasickness.",
      "My working budget: one signature scroll moment per page, two or three quiet reveals per section, and everything else instant. If a scroll effect doesn't clarify hierarchy, pace the narrative, or reward attention, it's decoration wearing motion's clothes.",
      "And measure the boring things. A cinematic page that drops frames is a slideshow with ambitions. 60fps isn't a nice-to-have for scroll storytelling — it's the suspension of disbelief.",
    ],
  },
  {
    slug: "design-tokens-that-survive",
    title: "Design tokens that survive a redesign",
    date: "Feb 2026",
    readingTime: "5 min",
    tag: "Systems",
    excerpt:
      "A small vocabulary of variables kept three projects consistent — here's the naming that actually worked.",
    body: [
      "Every redesign I've been through kills the same thing first: the color palette. Which is why naming a variable 'blue-500' is writing a check the next rebrand will bounce. The token didn't describe a decision; it described a pixel.",
      "The tokens that survived three projects were the ones named for roles, not values: background, surface, foreground, muted, line, accent. Six words. When the brand went from blue to burnt orange, one file changed and every component followed — because no component ever knew what color it was.",
      "The same discipline applies beyond color. 'space-4' means nothing when the density changes; 'section-gap' still means something. 'text-display-xl' survives a font swap that 'syne-96' would not.",
      "Small vocabularies beat big ones. Every token you add is a decision future-you must remember making. I cap semantic tokens at what fits on one screen — if a new component 'needs' a new token, it usually needs a better reading of the existing ones.",
      "The test for a good token name: could you redesign the entire visual identity without renaming it? If yes, it's a token. If no, it's a hard-coded value with better marketing.",
    ],
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
