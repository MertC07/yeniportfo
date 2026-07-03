"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/lib/hooks/use-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"
      }
      className="group flex items-center gap-2 rounded-full border hairline px-3.5 py-2 transition-colors duration-300 hover:border-foreground/40"
    >
      <span
        aria-hidden
        className="size-2.5 rounded-full border border-current bg-current transition-all duration-300 dark:bg-transparent"
      />
      <span className="microlabel text-foreground">
        {mounted ? (isDark ? "Light" : "Dark") : "Theme"}
      </span>
    </button>
  );
}
