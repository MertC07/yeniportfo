# Mert Ceren — Portfolio

A cinematic, editorial portfolio built from scratch. Dark-first with a light mode, smooth-scroll storytelling, and a sticky-stacked project showcase.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis · next-themes

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```

## Editing your content

All site content lives in **one file**: [`lib/data.ts`](lib/data.ts)

- `profile` — name, role, location, email, availability
- `heroStatement` — the big hero lines and subline
- `projects` — the project cards + case studies (title, description, tags, colors; swap the CSS-generated `palette` visual for real screenshots when ready)
- `experience` — the timeline entries
- `skillTiers` / `techMarquee` — the skills grid and marquee
- `testimonials` / `awards` — empty until real entries exist; fill them, then re-mount the sections in `app/page.tsx`
- `posts` — the journal cards and article bodies
- `socials`, `site` — links and SEO metadata (search for `EDIT:` comments)

## Design system

Design tokens (colors for both themes, fluid type scale, fonts) are defined in [`app/globals.css`](app/globals.css). Typography: Syne (display) · Inter (body) · JetBrains Mono (labels).

## Structure

```
app/            layout, page, globals.css, sitemap, robots
components/
  providers/    theme + Lenis smooth scroll (with reduced-motion handling)
  layout/       header, mobile menu, theme toggle, footer
  sections/     hero, works, about, skills, testimonials, awards, journal, contact
  ui/           reveal text, magnetic button, project card, marquee, …
lib/            data.ts (all content), hooks, utils
```

Animations run for all visitors by design (`prefers-reduced-motion` is intentionally not honored); only `transform`/`opacity` are animated for 60fps.
