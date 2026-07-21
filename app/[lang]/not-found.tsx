import Link from "next/link";
import { headers } from "next/headers";
import { Header } from "@/components/layout/header";
import { defaultLocale, getContent, isLocale, localePath } from "@/lib/content";

// not-found receives no params, so the locale comes from the x-locale
// header the proxy sets. Server-rendered on purpose: a client 404 would
// CSR the whole document and lose the pre-rendered markup.
export default async function NotFound() {
  const headerList = await headers();
  const headerLocale = headerList.get("x-locale") ?? "";
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const { ui } = getContent(locale);

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
