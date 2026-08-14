import { ImageResponse } from "next/og";
import { getContent, isLocale, locales } from "@/lib/content";
import { profile, projects, site } from "@/lib/data";
import { OG, inlineImage, loadSyne } from "@/lib/og";

export const size = OG.size;
export const contentType = "image/png";

/**
 * One card per project per locale, built at build time. Without this the
 * shared card in app/opengraph-image.tsx was used for every case study, so
 * a link to a single project posted anywhere showed the site's own title
 * and portrait with nothing to say which project it pointed at.
 *
 * The background is the project's own palette, mixed with the same three
 * radial gradients as the card on the index page and the case study banner,
 * so the link preview and the page it opens are recognisably the same
 * thing.
 */
export function generateStaticParams() {
  /* Both params, unlike the page beside it. A page inherits the locales
     from the layout's own generateStaticParams; this is a metadata route
     rather than a page and gets no such help, and with only the slug the
     build left it unresolved as /-/work/-/opengraph-image and deferred
     every card to request time. */
  return locales.flatMap((lang) =>
    projects.map(({ slug }) => ({ lang, slug }))
  );
}

/**
 * Only here to give each card its own alt text. `alt` can also be exported
 * as a constant, but a constant cannot see which project it is describing,
 * and the one value was being stamped onto all six cards in one language.
 */
export function generateImageMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const locale = isLocale(params.lang) ? params.lang : "tr";
  const { projects: localized } = getContent(locale);
  const project = localized.find((p) => p.slug === params.slug);
  return [
    {
      id: "card",
      size,
      contentType,
      alt: project ? `${project.title} — ${profile.name}` : site.title,
    },
  ];
}

const PANEL = 430;

/* The screenshot's left edge lands near x=695 (1200 − 64 right inset − 430
   wide, less the bulge its −3deg rotation adds), so text starting at the
   64px padding has this much room before it runs underneath. */
const TITLE_W = 600;

/**
 * A word cannot wrap, so the widest one decides the size — not the length
 * of the whole title, which is what this used to measure. "Rosso Lounge"
 * is short enough to look safe by that count and still printed LOUNGE
 * straight through the screenshot at 92px.
 *
 * 1.15em per character is measured off Syne ExtraBold's uppercase, which is
 * unusually wide; the tracking below claws a little of it back, so this
 * errs on the generous side.
 */
function titleSize(title: string): number {
  const longest = Math.max(...title.split(/\s+/).map((w) => w.length));
  return Math.max(46, Math.min(92, Math.floor(TITLE_W / (longest * 1.15))));
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : "tr";
  const { projects: localized } = getContent(locale);
  const index = localized.findIndex((p) => p.slug === slug);
  const project = localized[index];
  if (!project) return new ImageResponse(<div />, { ...size });

  const { palette } = project;
  const [syneBold, syneMedium, shot] = await Promise.all([
    loadSyne(800),
    loadSyne(500),
    project.image ? inlineImage(project.image) : null,
  ]);

  const background = [
    `radial-gradient(110% 90% at 12% 12%, ${palette.from} 0%, transparent 55%)`,
    `radial-gradient(95% 85% at 88% 25%, ${palette.via} 0%, transparent 62%)`,
    `radial-gradient(130% 130% at 50% 105%, ${palette.to} 0%, ${OG.bg} 100%)`,
    OG.bg,
  ].join(", ");

  const numeral = String(index + 1).padStart(2, "0");

  const screenshot = shot ? (
    <div
      style={{
        position: "absolute",
        top: 96,
        right: 64,
        width: PANEL,
        height: PANEL,
        display: "flex",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(242,240,234,0.18)",
        boxShadow: "0 30px 70px -20px rgba(0,0,0,0.8)",
        transform: "rotate(-3deg)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={shot}
        alt=""
        width={PANEL}
        height={PANEL}
        style={{ width: PANEL, height: PANEL, objectFit: "cover" }}
      />
    </div>
  ) : null;

  // Same offline fallback as the site card: satori cannot lay out text
  // without font data, so the card degrades to the palette and the shot.
  if (!syneBold) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background,
            position: "relative",
          }}
        >
          {screenshot}
        </div>
      ),
      { ...size }
    );
  }

  const fonts = [
    { name: "Syne", data: syneBold, weight: 800 as const, style: "normal" as const },
    ...(syneMedium
      ? [
          {
            name: "Syne",
            data: syneMedium,
            weight: 500 as const,
            style: "normal" as const,
          },
        ]
      : []),
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background,
          color: OG.ink,
          position: "relative",
          fontFamily: "Syne",
          padding: 64,
        }}
      >
        {/* Sits behind everything, mirroring the watermark on the card. */}
        <div
          style={{
            position: "absolute",
            right: -30,
            top: 40,
            display: "flex",
            fontSize: 340,
            fontWeight: 800,
            lineHeight: 1,
            color: "rgba(242,240,234,0.05)",
          }}
        >
          {numeral}
        </div>

        {screenshot}

        <div style={{ display: "flex", fontSize: 26, fontWeight: 800 }}>
          {profile.wordmark}
          <span style={{ color: OG.accent }}>.</span>
        </div>

        {/* Capped so a long title never runs under the screenshot panel. */}
        <div style={{ display: "flex", flexDirection: "column", width: TITLE_W }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 500,
              color: "rgba(242,240,234,0.75)",
            }}
          >
            <span style={{ color: OG.accent }}>{numeral}</span>
            <span style={{ margin: "0 14px" }}>—</span>
            {project.category}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: titleSize(project.title),
              fontWeight: 800,
              lineHeight: 0.98,
              textTransform: "uppercase",
              letterSpacing: -2,
            }}
          >
            {project.title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(242,240,234,0.16)",
            paddingTop: 24,
            fontSize: 21,
            fontWeight: 500,
            color: "rgba(242,240,234,0.75)",
          }}
        >
          <div style={{ display: "flex" }}>
            {project.tags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  marginRight: 10,
                  padding: "6px 16px",
                  borderRadius: 9999,
                  border: "1px solid rgba(242,240,234,0.22)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <span style={{ color: OG.ink }}>{new URL(site.url).host}</span>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
