"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { socials } from "@/lib/data";
import { cvVersion } from "@/lib/cv-version";
import { locales, localePath } from "@/lib/content";
import { useContent, useLocale } from "@/components/providers/locale-provider";

type Group = "sections" | "projects" | "actions";
type Command = {
  id: string;
  label: string;
  group: Group;
  /** Extra words the search should match but the row need not show. */
  keywords?: string;
  run: () => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Same expression the language toggle uses; see the note there. */
const LOCALE_PREFIX = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`);

/** Folds Turkish diacritics so "sertifika" finds "Sertifikalar". */
function normalize(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ı/g, "i");
}

/**
 * ⌘K. Not a new feature so much as one place for the ones already here —
 * the section links live in the header, the theme and language switches
 * beside them, the CV inside a modal at the bottom of the page, the
 * assistant behind a floating button. Reaching any of them meant knowing
 * where it was kept.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const locale = useLocale();
  const { navItems, projects, ui } = useContent();
  const { resolvedTheme, setTheme } = useTheme();
  const lenis = useLenis();

  const t = ui.palette;

  const go = useCallback(
    (hash: string) => {
      const path = localePath(locale, "/");
      /* On the home page this is a scroll, anywhere else a navigation.
         Lenis owns the scroll offset, so the jump has to go through it or
         it is overwritten on the next frame. */
      if (pathname.replace(LOCALE_PREFIX, "") === "" || pathname === path) {
        const target = document.querySelector(hash);
        if (target && lenis) {
          lenis.scrollTo(target as HTMLElement, { offset: -80 });
          return;
        }
      }
      router.push(`${path}${hash}`);
    },
    [lenis, locale, pathname, router]
  );

  const commands = useMemo<Command[]>(() => {
    const sections: Command[] = navItems.map((item) => ({
      id: `section-${item.href}`,
      label: item.label,
      group: "sections",
      run: () => go(item.href),
    }));

    const projectCommands: Command[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      group: "projects",
      keywords: `${project.category} ${project.tags.join(" ")}`,
      run: () => router.push(localePath(locale, `/work/${project.slug}`)),
    }));

    const bare = pathname.replace(LOCALE_PREFIX, "") || "/";
    const actions: Command[] = [
      {
        id: "all-work",
        label: t.actions.allWork,
        group: "actions",
        run: () => router.push(localePath(locale, "/work")),
      },
      {
        id: "theme",
        label: t.actions.theme,
        group: "actions",
        keywords: "dark light koyu açık tema",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "language",
        label: t.actions.language,
        group: "actions",
        keywords: "language dil english türkçe",
        run: () =>
          router.push(localePath(locale === "tr" ? "en" : "tr", bare)),
      },
      {
        id: "cv",
        label: t.actions.cv,
        group: "actions",
        keywords: "resume özgeçmiş pdf",
        run: () =>
          window.open(
            `/Mert_Ceren_CV.pdf?v=${cvVersion}`,
            "_blank",
            "noopener,noreferrer"
          ),
      },
      {
        id: "chat",
        label: t.actions.chat,
        group: "actions",
        keywords: "assistant asistan chat sohbet yapay zeka",
        run: () => window.dispatchEvent(new Event("open-assistant")),
      },
      ...socials.map((social) => ({
        id: `social-${social.label}`,
        label: social.label,
        group: "actions" as const,
        run: () =>
          window.open(social.href, "_blank", "noopener,noreferrer"),
      })),
    ];

    return [...sections, ...projectCommands, ...actions];
  }, [
    go, locale, navItems, pathname, projects, resolvedTheme, router, setTheme, t,
  ]);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return commands;
    return commands.filter((c) =>
      normalize(`${c.label} ${c.keywords ?? ""}`).includes(q)
    );
  }, [commands, query]);

  // Open with ⌘K / Ctrl+K, close with Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setOpen(false);
    };
    /* The header's search button asks through this rather than by faking a
       ⌘K keystroke, which only worked by accident and would break the day
       the shortcut changed. */
    const onRequest = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onRequest);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onRequest);
    };
  }, []);

  // A fresh query and selection every time it opens, and the caret in it.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    /* Focused straight from the effect. The input is already committed by
       the time this runs, so deferring it to a frame only bought a window
       where the palette was open and typing went to the page behind it. */
    inputRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Typing narrows the list, so the highlight has to come back into range.
  useEffect(() => {
    setActive((i) => Math.min(i, Math.max(results.length - 1, 0)));
  }, [results.length]);

  const runAt = (index: number) => {
    const command = results[index];
    if (!command) return;
    setOpen(false);
    command.run();
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(active);
    }
  };

  // Keeps the highlighted row visible while arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let lastGroup: Group | null = null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh] sm:pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.open}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-2xl border hairline bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b hairline px-5 py-4">
              <span aria-hidden className="microlabel text-accent">
                ⌘K
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                aria-controls="palette-results"
                aria-activedescendant={
                  results[active] ? `palette-${results[active].id}` : undefined
                }
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>

            <ul
              id="palette-results"
              ref={listRef}
              role="listbox"
              aria-label={t.open}
              className="max-h-[52vh] overflow-y-auto overscroll-contain p-2"
            >
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">
                  {t.empty}
                </li>
              )}
              {results.map((command, index) => {
                const heading = command.group !== lastGroup ? command.group : null;
                lastGroup = command.group;
                return (
                  <li key={command.id}>
                    {heading && (
                      <p className="microlabel px-3 pb-1 pt-4 first:pt-1">
                        {t.groups[heading]}
                      </p>
                    )}
                    <div
                      id={`palette-${command.id}`}
                      data-index={index}
                      role="option"
                      aria-selected={index === active}
                      tabIndex={-1}
                      onClick={() => runAt(index)}
                      onMouseMove={() => setActive(index)}
                      className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                        index === active
                          ? "bg-accent text-accent-ink"
                          : "text-foreground"
                      }`}
                    >
                      <span>{command.label}</span>
                      {index === active && (
                        <span aria-hidden className="font-mono text-[0.625rem] uppercase tracking-[0.14em]">
                          ↵ {t.hint}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
