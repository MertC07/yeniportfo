"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useContent } from "@/components/providers/locale-provider";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const { ui } = useContent();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? ui.theme.switchToLight
            : ui.theme.switchToDark
          : ui.theme.toggle
      }
      className="group flex items-center gap-2 rounded-full border hairline px-3.5 py-2 transition-colors duration-300 hover:border-foreground/40"
    >
      <span
        aria-hidden
        className="size-2.5 rounded-full border border-current bg-current transition-all duration-300 dark:bg-transparent"
      />
      <span className="microlabel text-foreground">
        {mounted ? (isDark ? ui.theme.light : ui.theme.dark) : ui.theme.fallback}
      </span>
    </button>
  );
}
