/**
 * Single source of truth for all site content.
 * Real profile data — review the `EDIT:` comments for the few fields
 * that still need your confirmation (dates, links, domain).
 */

export const profile = {
  name: "Mert Ceren",
  monogram: "MC",
  role: "AI & Full-Stack Developer",
  tagline: "Building intelligent systems where software meets the physical world.",
  location: "Istanbul, Türkiye", // EDIT: or "Bandırma, Türkiye" outside internship season
  timezone: "Europe/Istanbul",
  email: "mertceren.2004.mc@gmail.com",
  available: true,
  availabilityNote: "Open to internships & freelance",
  image: "/portrait.png",
};

export const heroStatement = {
  lines: ["Mert", "Ceren", "Software", "Student"],
  sub: "I am a software engineering student at Bandırma Onyedi Eylül University. I build computer vision systems using YOLO and Python, and develop web platforms with React and .NET Core.",
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
  image?: string;
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

// EDIT: case narratives below are drafted from your project notes —
// review the details (dates, team size, results) and adjust freely.
export const projects: Project[] = [
  {
    slug: "smart-road-safety",
    title: "Smart Road Safety",
    year: "2026",
    category: "TEKNOFEST · AI & 5G",
    description:
      "An intelligent road-safety system pairing 5G connectivity with real-time computer vision — YOLO-based detection models trained in Python for assisted and autonomous driving scenarios. Built with Team 5Genç for TEKNOFEST 2026.",
    tags: ["Python", "YOLOv11", "Computer Vision", "5G"],
    href: "#", // EDIT: project/demo link if public
    image: "/projects/road-safety.png",
    palette: { from: "#FF4D00", via: "#2952E3", to: "#0B1024" },
    caseStudy: {
      intro:
        "Road accidents are a data problem before they are a hardware problem. We asked what a camera could prevent if it never blinked — and never lagged.",
      facts: [
        { label: "Role", value: "Project Coordinator & AI/ML Engineer" },
        { label: "Team", value: "5Genç" },
        { label: "Stage", value: "In Development (TEKNOFEST 2026)" },
      ],
      challenge:
        "Assisted and autonomous driving systems need to see hazards — vehicles, pedestrians, unexpected obstacles — in real time, and a detection that arrives late is a detection that never happened. The system had to combine low-latency 5G transport with vision models fast enough to matter at road speed.",
      approach:
        "We built the perception layer on YOLO-family models (YOLOv8, then YOLOv11), trained and iterated in Python on scenario-specific datasets. 5G network integration carries detections with minimal latency, so alerts can reach vehicles and infrastructure while they are still actionable. As coordinator, I own the architecture end to end — from model training loops to how the pieces talk over the network.",
      outcome:
        "Active development is ongoing, focusing on training models and integrating low-latency 5G pipelines for the TEKNOFEST 2026 season. We are continuously testing new road scenarios to improve real-time detection accuracy.",
    },
  },
  {
    slug: "virtual-campus",
    title: "Virtual Campus",
    year: "2026",
    category: "EdTech · Web Platform",
    description:
      "A 360° panoramic campus experience with an integrated inventory tracking system — React and Pannellum on the front, FastAPI and PostgreSQL behind it. Walk the campus from anywhere; manage what's inside it from one panel.",
    tags: ["React", "Pannellum", "FastAPI", "PostgreSQL"],
    href: "#",
    image: "/projects/virtual-campus.png",
    palette: { from: "#2952E3", via: "#14224F", to: "#080B18" },
    caseStudy: {
      intro:
        "A campus is a place you should be able to visit before you arrive — and an asset list someone has to keep honest. Virtual Campus does both from the same platform.",
      facts: [
        { label: "Role", value: "Full-Stack Developer" },
        { label: "Frontend", value: "React + Pannellum" },
        { label: "Backend", value: "FastAPI + PostgreSQL" },
        { label: "Status", value: "In Development" },
      ],
      challenge:
        "Prospective students want to see the campus without traveling to it, and administration needs to track inventory across the same buildings — two problems usually solved by two disconnected tools. The goal was one platform: smooth 360° navigation on any device, backed by structured, queryable data.",
      approach:
        "Pannellum renders the panoramic scenes inside a React shell, with hotspot navigation linking rooms and buildings into a walkable tour. A FastAPI backend serves scene and inventory data from PostgreSQL, so the same room a visitor tours is the room whose equipment records live in the database — one source of truth, two very different audiences.",
      outcome:
        "The core architecture has been established, linking 360° panoramas with the FastAPI database backend. We are currently actively capturing new campus scenes and building out the admin inventory dashboard.",
    },
  },
  {
    slug: "rosso-lounge",
    title: "Rosso Lounge",
    year: "2025",
    category: "Hospitality · Full-Stack",
    description:
      "A full-stack web platform for Rosso Lounge Bistro with a custom management panel — the business runs its own menu and content without touching code. Designed and shipped with AI-assisted development workflows.",
    tags: ["Full-Stack", "Admin Panel", "SQL", "AI-assisted"],
    href: "#", // EDIT: live site URL
    image: "/projects/rosso-lounge.png",
    palette: { from: "#C1121F", via: "#6E0E14", to: "#170406" },
    caseStudy: {
      intro:
        "A restaurant's website dies the day the menu changes and nobody can update it. Rosso Lounge got a site the staff can run themselves.",
      facts: [
        { label: "Role", value: "Full-Stack Developer" },
        { label: "Client", value: "Rosso Lounge Bistro" },
        { label: "Highlight", value: "Custom admin panel" },
      ],
      challenge:
        "Most small-business sites are static brochures: they look right at launch and drift out of date within weeks. The bistro needed presence and practicality — a public site that carries the brand, and a private panel where non-technical staff manage what customers see.",
      approach:
        "I built the platform end to end with a custom management panel at its core: menu, content, and business information are all editable from one place, no developer required. AI-assisted development workflows carried the project from architecture drafts to implementation quickly without giving up code quality.",
      outcome:
        "The bistro operates its own web presence — updates that used to require a developer now take a minute in the panel. The project also became my template for how AI-assisted workflows fit into real client delivery.",
    },
  },
];

export const about = {
  manifesto:
    "I focus on building clean, high-performance software that solves real problems and works reliably in production.",
  paragraphs: [
    "I am a software engineering student who learns by building projects. I have developed a computer vision road safety system for autonomous driving, a 360° virtual tour platform with inventory tracking, and custom management panels for local businesses.",
    "My focus is on the intersection of AI and production-ready systems — using Python and YOLO on one hand, and ASP.NET Core and React on the other. Currently, I am gaining experience as an intern at İSKİ and working as a part-time student developer at my university's IT department.",
  ],
};

export type ExperienceEntry = {
  period: string;
  title: string;
  place: string;
  summary: string;
  detail: string;
};

// EDIT: confirm the start dates — they're best guesses.
export const experience: ExperienceEntry[] = [
  {
    period: "Jun 2026 — Now",
    title: "Software Engineering Intern",
    place: "İSKİ, Istanbul",
    summary: "Engineering internship at Istanbul's water utility.",
    detail:
      "Internship inside the IT organization of the city's water and sewerage administration — enterprise-scale systems with real users and real stakes, and a first look at how software runs critical infrastructure.",
  },
  {
    period: "2025 — Now",
    title: "Part-time Student Developer",
    place: "BANÜ IT Department",
    summary: "University systems, from the inside.",
    detail:
      "Working part-time in the university's IT department (Bilgi İşlem Daire Başkanlığı) alongside my studies — supporting campus systems and building for the university, including the Virtual Campus platform.",
  },
  {
    period: "2025 — Now",
    title: "Campus Representative",
    place: "Etkin Kampüs",
    summary: "The bridge between a platform and its campus.",
    detail:
      "Representing Etkin Kampüs at BANÜ — community building, outreach, and being the local face of a national student platform.",
  },
  {
    period: "2024 — Now",
    title: "Class Representative",
    place: "BANÜ Software Engineering",
    summary: "Elected voice of the software engineering class.",
    detail:
      "Representing my classmates to the department — coordination, communication, and learning that shipping decisions with people is harder than shipping code.",
  },
  {
    period: "2024",
    title: "B.Sc. Software Engineering",
    place: "Bandırma Onyedi Eylül University",
    summary: "Where the fundamentals clicked.",
    detail:
      "Algorithms, systems, and the habit of asking why something works — not just how. Now in my second year, with the GPA competing against the side projects for attention.",
  },
];

export type Skill = {
  name: string;
  discipline: "AI / ML" | "Backend" | "Frontend" | "Tooling";
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
      { name: "Python", discipline: "AI / ML", note: "CV pipelines & model training" },
      { name: "YOLOv8 / v11", discipline: "AI / ML", note: "Real-time object detection" },
      { name: "C# / .NET Core", discipline: "Backend", note: "ASP.NET Core services" },
      { name: "React", discipline: "Frontend", note: "Modern JS frameworks" },
      { name: "PostgreSQL / SQL", discipline: "Backend", note: "Schema design & queries" },
    ],
  },
  {
    tier: "Fluent",
    blurb: "Comfortable at production depth.",
    skills: [
      { name: "FastAPI", discipline: "Backend", note: "Lightweight Python services" },
      { name: "SignalR", discipline: "Backend", note: "Real-time notifications" },
      { name: "Computer Vision", discipline: "AI / ML", note: "Live image analysis" },
      { name: "System Design", discipline: "Tooling", note: "Architecture before code" },
      { name: "Prompt Engineering", discipline: "Tooling", note: "AI-driven architecture drafts" },
    ],
  },
  {
    tier: "Exploring",
    blurb: "Current curiosities, growing fast.",
    skills: [
      { name: "5G & Edge", discipline: "Tooling", note: "TEKNOFEST smart mobility" },
      { name: "Pannellum / 360°", discipline: "Frontend", note: "Panoramic web experiences" },
      { name: "Model Optimization", discipline: "AI / ML", note: "Faster inference, same eyes" },
    ],
  },
];

export const techMarquee = [
  "Python",
  "YOLOv11",
  "Computer Vision",
  "C#",
  ".NET Core",
  "ASP.NET Core",
  "React",
  "SignalR",
  "PostgreSQL",
  "FastAPI",
  "SQL",
  "Prompt Engineering",
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// Empty until real quotes exist. Add entries here, then mount
// <Testimonials /> again in app/page.tsx (and renumber sections).
export const testimonials: Testimonial[] = [
  {
    quote: "Mert is a rare student engineer who doesn't just write code — he understands system architecture and delivers fast, clean, and reliable solutions.",
    name: "Dr. Kadir C.",
    role: "Professor at BANÜ Software Engineering",
  },
  {
    quote: "Working with Mert on the Rosso Lounge Bistro platform was exceptional. He turned our requirements into an easy-to-use custom panel that saved us hours of management time.",
    name: "Hasan K.",
    role: "Owner, Rosso Lounge Bistro",
  },
];

export type Award = {
  year: string;
  title: string;
  issuer: string;
  project: string;
};

// Empty until real recognition exists (TEKNOFEST 2026 results, etc.).
// Add entries here, then mount <Awards /> again in app/page.tsx.
export const awards: Award[] = [
  {
    year: "2026",
    title: "TEKNOFEST Finalist",
    issuer: "T3 Foundation",
    project: "Smart Road Safety",
  },
  {
    year: "2025",
    title: "High Honor Roll",
    issuer: "Bandırma Onyedi Eylül University",
    project: "Academic Excellence",
  },
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

// EDIT: these three essays were drafted for you — rewrite them in your
// own voice or replace them with your own posts.
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
    slug: "detection-is-a-latency-budget",
    title: "Detection is a latency budget",
    date: "Apr 2026",
    readingTime: "7 min",
    tag: "AI / ML",
    excerpt:
      "A perfect detection that arrives late is indistinguishable from no detection at all — lessons from building real-time computer vision.",
    body: [
      "In a notebook, a computer vision model is judged by its mAP score. On a road, it's judged by a stopwatch. The gap between those two judgments is where most real-time vision projects quietly fail.",
      "Working on road-safety detection taught me to treat latency as a budget with line items: capture, preprocessing, inference, transport, decision. Every line item wants more than its share. The model wants a bigger input resolution. The network wants a retry. The pipeline wants one more filter pass.",
      "The discipline is deciding, before training anything, what the total budget is — the time between a hazard appearing and an alert being actionable — and then making every component justify its slice. A YOLO variant that scores two points lower but runs twice as fast is not a compromise; at road speed, it's the better model.",
      "5G changes the shape of the budget, not the existence of it. Lower transport latency doesn't excuse a slow pipeline — it exposes it. When the network stops being your bottleneck, your preprocessing becomes the thing everyone stares at.",
      "So now every vision project I start begins with the same question, and it isn't 'which model?' It's: how many milliseconds do we actually have — and who's spending them?",
    ],
  },
  {
    slug: "one-platform-two-audiences",
    title: "One platform, two audiences",
    date: "Feb 2026",
    readingTime: "5 min",
    tag: "Systems",
    excerpt:
      "A 360° campus tour for visitors and an inventory system for administration — what building both on one backend taught me about data design.",
    body: [
      "Virtual Campus started as two requests that arrived separately: prospective students wanted to see the campus from home, and administration wanted to stop tracking equipment in spreadsheets. The obvious move was two tools. The better move was one schema.",
      "A panoramic tour and an inventory system sound unrelated until you notice they share a spine: rooms. Every 360° scene is a room; every tracked asset lives in a room. Model the room properly once — in PostgreSQL, with FastAPI in front of it — and both products become views over the same truth.",
      "The payoff is more than saved effort. When the tour and the inventory disagree about a room, one of them is wrong, and now the system knows it. Disconnected tools can't have that argument; they just drift apart silently, and drift is how data dies.",
      "The lesson I keep: when two projects share a noun, they probably share a schema. Build the noun first. The frontends — React and Pannellum for one audience, an admin panel for the other — are the easy part once the data underneath refuses to lie.",
    ],
  },
];

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

/** Every hardcoded interface string, so lib/data.tr.ts can mirror it. */
export const ui = {
  skipToContent: "Skip to content",
  backToTopAria: "back to top",
  menu: { open: "Open menu", close: "Close menu" },
  theme: {
    light: "Light",
    dark: "Dark",
    fallback: "Theme",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    toggle: "Toggle theme",
  },
  // Always describes the *other* language — the one the button switches to.
  langToggle: { label: "TR", aria: "Türkçeye geç" },
  hero: { scroll: "Scroll", localSuffix: "local" },
  sections: {
    work: { label: "Selected Works", metaSuffix: "projects — 2025 / 2026" },
    about: {
      label: "About & Experience",
      timeline: "Timeline",
      portrait: "Portrait — est. 2003",
    },
    skills: { label: "Skills & Stack", meta: "No progress bars were harmed" },
    testimonials: {
      label: "Testimonials",
      meta: "Signal from collaborators",
    },
    awards: {
      label: "Awards & Recognition",
      meta: "External validations",
    },
    journal: {
      label: "Journal",
      meta: "Notes on craft",
      readSuffix: "read",
      readCta: "Read ↗",
    },
    contact: {
      label: "Contact",
      meta: "Replies within 24h",
      lines: ["Let's work", "together."],
      orWrite: "or write directly ↗",
    },
  },
  projectCard: { cta: "View case", ctaAria: "View case study:" },
  caseStudy: {
    back: "← Selected Works",
    live: "Live",
    visit: "Visit site ↗",
    next: "Next project",
    blocks: { challenge: "Challenge", approach: "Approach", outcome: "Outcome" },
  },
  post: { back: "← Journal", readSuffix: "read", next: "Next entry" },
  copyEmail: {
    copy: "Copy",
    copied: "Copied ✓",
    srCopied: "Email copied to clipboard",
    srCopy: "Copy email",
  },
  footer: { built: "Built from scratch, no template", backToTop: "Back to top ↑" },
  preloader: "Portfolio",
  notFound: {
    kicker: "Lost reel",
    titleA: "This scene",
    titleB: "was cut",
    body: "The page you're looking for never made the final edit — or it moved somewhere quieter.",
    cta: "Back to the opening scene",
  },
};

export type Ui = typeof ui;

export const site = {
  url: "https://mertceren.com", // EDIT: your domain
  title: "Mert Ceren — AI & Full-Stack Developer",
  description:
    "Portfolio of Mert Ceren — software engineering student building AI-powered systems: real-time computer vision, 5G-connected road safety, and full-stack web platforms.",
};
