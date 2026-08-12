"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useContent, useLocale } from "@/components/providers/locale-provider";
import { localePath } from "@/lib/content";

// not-found receives no params, so the locale comes from the provider the
// layout already feeds with params.lang — right on the server render, with no
// flash. Reading it from the request headers instead opts every route under
// app/[lang] into dynamic rendering, which costs the whole site its
// prerendered HTML for the sake of one error page.
export default function NotFound() {
  const locale = useLocale();
  const { ui } = useContent();

  return (
    <>
      <Header />
      <main
        id="main"
        className="flex min-h-svh flex-col items-center justify-center px-5 text-center"
      >
        <p className="microlabel">
          404
          <span className="mx-3 select-none" aria-hidden>
            —
          </span>
          {ui.notFound.kicker}
        </p>
        <h1 className="mt-6 font-display text-display-xl font-extrabold uppercase leading-[0.95] tracking-tight">
          {ui.notFound.titleA}
          <br />
          {ui.notFound.titleB}<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          {ui.notFound.body}
        </p>
        <Link
          href={localePath(locale, "/")}
          className="mt-10 inline-flex items-center gap-2 rounded-full border hairline px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink"
        >
          {ui.notFound.cta}
        </Link>
      </main>
    </>
  );
}
