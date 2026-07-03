import { ImageResponse } from "next/og";
import { heroStatement, profile, site } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.title;

/**
 * Fetches Syne ExtraBold at build time. The old-browser User-Agent
 * makes Google Fonts serve TTF/WOFF instead of woff2, which satori
 * can't read. Returns null if offline.
 */
async function loadSyne(): Promise<ArrayBuffer | null> {
  try {
    const css = await (
      await fetch("https://fonts.googleapis.com/css2?family=Syne:wght@800", {
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

const glow = {
  position: "absolute" as const,
  right: -180,
  top: -180,
  width: 620,
  height: 620,
  borderRadius: 9999,
  background:
    "radial-gradient(circle, rgba(255,77,0,0.30) 0%, rgba(255,77,0,0) 65%)",
  display: "flex",
};

export default async function OpengraphImage() {
  const syne = await loadSyne();

  // Offline build fallback: geometric card, no text (satori requires font data for text)
  if (!syne) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            background: "#0a0a0b",
            position: "relative",
            padding: 72,
          }}
        >
          <div style={glow} />
          <div
            style={{
              position: "absolute",
              left: 72,
              bottom: 72,
              width: 28,
              height: 28,
              borderRadius: 9999,
              background: "#ff4d00",
              display: "flex",
            }}
          />
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          color: "#f2f0ea",
          padding: 72,
          position: "relative",
          fontFamily: "Syne",
        }}
      >
        <div style={glow} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 3,
          }}
        >
          <span>
            {profile.monogram}
            <span style={{ color: "#ff4d00" }}>.</span>
          </span>
          <span style={{ color: "#8a867c" }}>PORTFOLIO — 2026</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1,
            textTransform: "uppercase",
            letterSpacing: -1,
          }}
        >
          {heroStatement.lines.map((line, i) => {
            const endsWithPeriod = line.endsWith(".");
            return (
              <span key={i} style={{ display: "flex" }}>
                {endsWithPeriod ? line.slice(0, -1) : line}
                {endsWithPeriod && <span style={{ color: "#ff4d00" }}>.</span>}
              </span>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(242,240,234,0.16)",
            paddingTop: 28,
            fontSize: 24,
            color: "#8a867c",
          }}
        >
          <span>
            {profile.name} — {profile.role}
          </span>
          <span>{new URL(site.url).host}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Syne", data: syne, weight: 800, style: "normal" }],
    }
  );
}
