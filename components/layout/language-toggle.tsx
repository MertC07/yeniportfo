"use client";

import { usePathname } from "next/navigation";
import { useContent, useLocale } from "@/components/providers/locale-provider";
import { localePath } from "@/lib/content";

/**
 * EN ↔ TR switch: links to the same page in the other locale.
 * Deliberately a plain <a>, not next/link — switching locale swaps the
 * root layout (<html lang>), and a soft navigation would client-rerender
 * the document tree (React then warns about the theme <script> tag).
 */
export function LanguageToggle() {
  const locale = useLocale();
  const { ui } = useContent();
  const pathname = usePathname() ?? "/";

  // Strip any locale prefix to the bare path, then re-prefix for the other
  // locale. Turkish lives at the root, English under /en.
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const target = localePath(locale === "tr" ? "en" : "tr", bare);

  return (
    <a
      href={target}
      aria-label={ui.langToggle.aria}
      className="flex items-center rounded-full border hairline px-3.5 py-2 transition-colors duration-300 hover:border-foreground/40"
    >
      <span className="microlabel text-foreground">{ui.langToggle.label}</span>
    </a>
  );
}
