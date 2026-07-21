import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile, site } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.title;

const BG = "#0a0a0b";
const INK = "#f2f0ea";
const MUTED = "#8a867c";
const ACCENT = "#ff4d00";
const PHOTO_W = 470;

/**
 * Fetches a Syne weight at build time. The old-browser User-Agent makes
 * Google Fonts serve a single unsubsetted TTF/WOFF instead of the
 * unicode-range-split woff2 files satori can't read — which also keeps
 * Turkish glyphs (ü, ğ, ı) available. Returns null if offline.
 */
async function loadSyne(weight: 500 | 800): Promise<ArrayBuffer | null> {
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
 * Inlines the portrait as a data URI. The mime type comes from the magic
 * bytes rather than the file extension — public/portrait.png is actually
 * a JPEG, and satori rejects a mislabelled one.
 */
async function loadPortrait(): Promise<string | null> {
  if (!profile.image) return null;
  try {
    const file = await readFile(
      path.join(process.cwd(), "public", profile.image)
    );
    const isPng =
      file[0] === 0x89 && file[1] === 0x50 && file[2] === 0x4e && file[3] === 0x47;
    const isJpeg = file[0] === 0xff && file[1] === 0xd8 && file[2] === 0xff;
    if (!isPng && !isJpeg) return null;
    return `data:image/${isPng ? "png" : "jpeg"};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [syneBold, syneMedium, portrait] = await Promise.all([
    loadSyne(800),
    loadSyne(500),
    loadPortrait(),
  ]);

  const glow = (
    <div
      style={{
        position: "absolute",
        right: PHOTO_W - 260,
        top: -200,
        width: 620,
        height: 620,
        borderRadius: 9999,
        background: `radial-gradient(circle, rgba(255,77,0,0.28) 0%, rgba(255,77,0,0) 65%)`,
        display: "flex",
      }}
    />
  );

  const photo = portrait ? (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: PHOTO_W,
        height: size.height,
        display: "flex",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={portrait}
        alt=""
        width={PHOTO_W}
        height={size.height}
        style={{
          width: PHOTO_W,
          height: size.height,
          objectFit: "cover",
          objectPosition: "center 18%",
        }}
      />
      {/* Melts the photo's left edge into the card instead of a hard crop */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 190,
          height: size.height,
          background: `linear-gradient(to right, ${BG} 0%, rgba(10,10,11,0.55) 55%, rgba(10,10,11,0) 100%)`,
          display: "flex",
        }}
      />
    </div>
  ) : null;

  // Offline build fallback: satori can't lay out text without font data,
  // so the card degrades to the portrait plus the geometric accent mark.
  if (!syneBold) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: BG,
            position: "relative",
          }}
        >
          {glow}
          {photo}
          <div
            style={{
              position: "absolute",
              left: 72,
              bottom: 72,
              width: 28,
              height: 28,
              borderRadius: 9999,
              background: ACCENT,
              display: "flex",
            }}
          />
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

  const [firstName, ...restName] = profile.name.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BG,
          color: INK,
          position: "relative",
          fontFamily: "Syne",
        }}
      >
        {glow}
        {photo}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: size.width - PHOTO_W + 40,
            height: "100%",
            padding: 72,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, fontWeight: 800 }}>
            {profile.wordmark}
            <span style={{ color: ACCENT }}>.</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 96,
                fontWeight: 800,
                lineHeight: 0.94,
                textTransform: "uppercase",
                letterSpacing: -2,
              }}
            >
              <span>{firstName}</span>
              <span style={{ display: "flex" }}>
                {restName.join(" ")}
                <span style={{ color: ACCENT }}>.</span>
              </span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 27,
                fontWeight: 500,
                color: MUTED,
              }}
            >
              {profile.role}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(242,240,234,0.16)",
              paddingTop: 26,
              fontSize: 22,
              fontWeight: 500,
              color: MUTED,
            }}
          >
            <span>{profile.location}</span>
            <span style={{ color: INK }}>{new URL(site.url).host}</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
