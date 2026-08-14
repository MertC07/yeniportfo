import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Shared by the two social cards: app/opengraph-image.tsx (the site) and
 * app/[lang]/work/[slug]/opengraph-image.tsx (one per project). Both run
 * through satori at build time, which is fussy about fonts and image bytes
 * in the same two ways, so the workarounds live here rather than twice.
 */

/**
 * Fetches a Syne weight at build time. The old-browser User-Agent makes
 * Google Fonts serve a single unsubsetted TTF/WOFF instead of the
 * unicode-range-split woff2 files satori can't read — which also keeps
 * Turkish glyphs (ü, ğ, ı) available. Returns null if offline.
 */
export async function loadSyne(
  weight: 500 | 800
): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=Syne:wght@${weight}`, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.1; rv:10.0) Gecko/20100101 Firefox/10.0",
        },
      })
    ).text();
    const url = css.match(
      /src: url\((.+?)\) format\('(?:truetype|opentype|woff)'\)/
    )?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

/**
 * Inlines a file from /public as a data URI. The mime type comes from the
 * magic bytes rather than the file extension — public/portrait.png is
 * actually a JPEG, and satori rejects a mislabelled one.
 */
export async function inlineImage(src: string): Promise<string | null> {
  try {
    const file = await readFile(path.join(process.cwd(), "public", src));
    const isPng =
      file[0] === 0x89 && file[1] === 0x50 && file[2] === 0x4e && file[3] === 0x47;
    const isJpeg = file[0] === 0xff && file[1] === 0xd8 && file[2] === 0xff;
    if (!isPng && !isJpeg) return null;
    return `data:image/${isPng ? "png" : "jpeg"};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

/** The card palette, matching app/globals.css's dark theme. */
export const OG = {
  bg: "#0a0a0b",
  ink: "#f2f0ea",
  muted: "#8a867c",
  accent: "#ff4d00",
  size: { width: 1200, height: 630 },
} as const;
