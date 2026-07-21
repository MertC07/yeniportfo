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
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
    },
    robots: { index: true, follow: true },
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

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>
        <LocaleProvider locale={lang}>
          <ThemeProvider>
            <SmoothScroll>
              {children}
              <ScrollProgress />
              <Preloader />
              <GrainOverlay />
              <Cursor />
            </SmoothScroll>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
