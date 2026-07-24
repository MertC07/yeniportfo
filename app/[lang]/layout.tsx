import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { Preloader } from "@/components/ui/preloader";
import { Cursor } from "@/components/ui/cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { AiAssistant } from "@/components/ui/ai-assistant";
import { getContent, isLocale, localePath, locales } from "@/lib/content";
import "../globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

/** Stable, redirect-free path to the generated social card. */
const OG_IMAGE = "/opengraph-image";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { site, profile } = getContent(lang);

  return {
    metadataBase: new URL(site.url),
    title: site.title,
    description: site.description,
    keywords: ["creative developer", "frontend engineer", "portfolio", profile.name],
    authors: [{ name: profile.name }],
    alternates: {
      canonical: localePath(lang, "/"),
      languages: { tr: localePath("tr", "/"), en: localePath("en", "/") },
    },
    openGraph: {
      title: site.title,
      description: site.description,
      url: localePath(lang, "/"),
      siteName: profile.name,
      locale: lang === "tr" ? "tr_TR" : "en_US",
      type: "website",
      // Referenced explicitly: app/opengraph-image.tsx sits in the root
      // segment while every page renders from app/[lang], so the file
      // convention never attaches it on its own. A root-level path also
      // dodges the /tr → / redirect that a locale-scoped image would hit.
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: site.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      images: [OG_IMAGE],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: ["/favicon.ico"],
    },
    verification: {
      google: "ritwe6f3XsnpHr7JNveLqu_-yCIRypKoDU9texqIOzY",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { site, profile } = getContent(lang);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": profile.name,
    "jobTitle": profile.role,
    "description": site.description,
    "url": site.url,
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Bandırma Onyedi Eylül Üniversitesi",
    },
    "sameAs": [
      "https://github.com/MertC07",
      "https://www.linkedin.com/in/mert-ceren-1a7b10297",
    ],
  };

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style font-display="swap">{`
          #main, header, footer {
            transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
          }
          html.is-loading #main,
          html.is-loading header,
          html.is-loading footer {
            opacity: 0 !important;
            transform: translateY(16px);
            pointer-events: none;
          }
        `}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!sessionStorage.getItem("intro-seen")){document.documentElement.classList.add("is-loading");}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-background">
        <LocaleProvider locale={lang}>
          <ThemeProvider>
            <Preloader />
            <SmoothScroll>
              {children}
              <ScrollProgress />
              <AiAssistant />
              <GrainOverlay />
              <Cursor />
            </SmoothScroll>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
