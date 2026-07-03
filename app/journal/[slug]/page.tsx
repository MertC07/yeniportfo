import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RevealText } from "@/components/ui/reveal-text";
import { posts, profile } from "@/lib/data";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${profile.name}`,
    description: post.excerpt,
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const post = posts[index];
  const next = posts[(index + 1) % posts.length];

  return (
    <>
      <Header />
      <main id="main" className="px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb + meta */}
          <div className="flex items-baseline justify-between border-t hairline pt-4">
            <Link
              href="/#journal"
              className="microlabel transition-colors duration-300 hover:text-accent"
            >
              ← Journal
            </Link>
            <p className="microlabel">
              <span className="text-accent">{post.tag}</span>
              <span className="mx-3 select-none" aria-hidden>
                —
              </span>
              {post.date} · {post.readingTime} read
            </p>
          </div>

          {/* Title */}
          <RevealText
            as="h1"
            lines={[post.title]}
            className="mt-12 font-display text-display-lg font-extrabold leading-[1.02] tracking-tight"
          />

          {/* Body */}
          <div className="mt-12 space-y-6 border-t hairline pt-10">
            {post.body.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-base leading-relaxed text-foreground sm:text-lg"
                    : "text-sm leading-relaxed text-foreground/85 sm:text-base"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Signature */}
          <p className="microlabel mt-12">
            — {profile.name}, {post.date}
          </p>

          {/* Next post */}
          <div className="mt-20 border-t hairline pt-8">
            <p className="microlabel">Next entry</p>
            <Link
              href={`/journal/${next.slug}`}
              className="group mt-3 inline-flex items-baseline gap-4 font-display text-display-md font-bold tracking-tight transition-colors duration-300 hover:text-accent"
            >
              {next.title}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-2"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
