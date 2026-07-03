import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RevealText } from "@/components/ui/reveal-text";
import { Magnetic } from "@/components/ui/magnetic-button";
import { projects, profile } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.description,
  };
}

const BLOCKS = ["challenge", "approach", "outcome"] as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const { palette, caseStudy } = project;

  return (
    <>
      <Header />
      <main id="main" className="px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
        {/* Breadcrumb row */}
        <div className="flex items-baseline justify-between border-t hairline pt-4">
          <Link
            href="/#work"
            className="microlabel transition-colors duration-300 hover:text-accent"
          >
            ← Selected Works
          </Link>
          <p className="microlabel">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </p>
        </div>

        {/* Title */}
        <RevealText
          as="h1"
          lines={[project.title]}
          className="mt-12 font-display text-display-xl font-extrabold uppercase leading-none tracking-tight"
        />
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4">
          <p className="microlabel">
            {project.category}
            <span className="mx-3 select-none" aria-hidden>
              —
            </span>
            {project.year}
          </p>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border hairline px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Palette banner (swap for a real hero screenshot later) */}
        <div
          aria-hidden
          className="relative mt-10 overflow-hidden rounded-2xl sm:rounded-3xl"
        >
          <div
            className="aspect-[16/9] w-full sm:aspect-[21/9]"
            style={{
              background: [
                `radial-gradient(110% 90% at 12% 12%, ${palette.from} 0%, transparent 55%)`,
                `radial-gradient(95% 85% at 88% 25%, ${palette.via} 0%, transparent 62%)`,
                `radial-gradient(130% 130% at 50% 105%, ${palette.to} 0%, #0a0a0b 100%)`,
                "#0a0a0b",
              ].join(", "),
            }}
          />
          <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-display text-[22vw] font-extrabold leading-none text-white/[0.05] sm:text-[14vw]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Intro + facts */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-20">
          <p className="max-w-2xl font-display text-display-md font-bold leading-[1.15] tracking-tight">
            {caseStudy.intro}
          </p>
          <dl className="self-start border-t hairline">
            {caseStudy.facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-6 border-b hairline py-4"
              >
                <dt className="microlabel">{fact.label}</dt>
                <dd className="text-sm font-medium sm:text-base">{fact.value}</dd>
              </div>
            ))}
            {project.href !== "#" && (
              <div className="flex items-baseline justify-between gap-6 border-b hairline py-4">
                <dt className="microlabel">Live</dt>
                <dd>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-accent hover:underline sm:text-base"
                  >
                    Visit site ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Narrative blocks */}
        <div className="mt-20 space-y-14 sm:mt-24">
          {BLOCKS.map((block, i) => (
            <section key={block} className="grid gap-4 border-t hairline pt-6 sm:grid-cols-[16rem_1fr] sm:gap-10">
              <h2 className="microlabel">
                <span className="text-accent">0{i + 1}</span>
                <span className="mx-3 select-none" aria-hidden>
                  —
                </span>
                {block.charAt(0).toUpperCase() + block.slice(1)}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/85 sm:text-base">
                {caseStudy[block]}
              </p>
            </section>
          ))}
        </div>

        {/* Next project */}
        <div className="mt-24 border-t hairline pt-10 sm:mt-32">
          <p className="microlabel">Next project</p>
          <Magnetic strength={0.1}>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-4 inline-flex items-baseline gap-5 font-display text-display-lg font-extrabold uppercase tracking-tight transition-colors duration-300 hover:text-accent"
            >
              {next.title}
              <span
                aria-hidden
                className="text-display-md transition-transform duration-300 group-hover:translate-x-2"
              >
                →
              </span>
            </Link>
          </Magnetic>
        </div>
      </main>
      <Footer />
    </>
  );
}
