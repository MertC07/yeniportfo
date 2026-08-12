"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    // Transitions are suppressed for the duration of the swap. Flipping the
    // theme rewrites the custom properties every colour on the page reads
    // from, so leaving transitions on sets thousands of elements animating at
    // once — including the blurred panels and the blended grain layer, which
    // the compositor then has to redraw on every frame of the fade. That is
    // the stutter; the swap itself is one cheap class change.
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
