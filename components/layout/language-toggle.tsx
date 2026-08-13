"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContent, useLocale } from "@/components/providers/locale-provider";
import { locales, localePath } from "@/lib/content";

/**
 * Any locale segment at the front of the path, whether the visitor's URL
 * carries it (/en/...) or the proxy put it there rewriting the bare Turkish
 * paths (/ → /tr). usePathname() reports the rewritten path, so both have to
 * come off before the other locale's prefix goes on — stripping only /en left
 * the /tr in place and sent the switch to /en/tr.
 */
const LOCALE_PREFIX = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`);

/**
 * EN ↔ TR switch: links to the same page in the other locale.
 *
 * Navigates client-side and keeps the scroll position, so switching language
 * reads like the theme toggle rather than dropping the visitor back at the
 * top of the page.
 */
export function LanguageToggle() {
  const locale = useLocale();
  const { ui } = useContent();
  const pathname = usePathname() ?? "/";

  const bare = pathname.replace(LOCALE_PREFIX, "") || "/";
  const target = localePath(locale === "tr" ? "en" : "tr", bare);

  return (
    <Link
      href={target}
      scroll={false}
      aria-label={ui.langToggle.aria}
      // First control after the nav, so the header chick uses it as the far
      // end of its walk — otherwise it wanders under these buttons.
      data-chick-limit=""
      className="tap-target flex items-center rounded-full border hairline px-3.5 py-2 transition-colors duration-300 hover:border-foreground/40"
    >
      <span className="microlabel text-foreground">{ui.langToggle.label}</span>
    </Link>
  );
}
