"use client";

import { createContext, useContext } from "react";
import { defaultLocale, getContent, type Content, type Locale } from "@/lib/content";

const LocaleContext = createContext<Locale>(defaultLocale);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/** Content bundle for the active locale — the client-side counterpart of getContent(lang). */
export function useContent(): Content {
  return getContent(useLocale());
}
