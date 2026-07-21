import type { MetadataRoute } from "next";
import { site, projects, posts } from "@/lib/data";
import { locales, localePath } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    ...projects.map((project) => ({ path: `/work/${project.slug}`, priority: 0.8 })),
    ...posts.map((post) => ({ path: `/journal/${post.slug}`, priority: 0.6 })),
  ];

  return locales.flatMap((locale) =>
    pages.map(({ path, priority }) => ({
      url: `${site.url}${localePath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          en: `${site.url}${path}`,
          tr: `${site.url}${localePath("tr", path)}`,
        },
      },
    }))
  );
}
