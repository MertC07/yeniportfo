"use client";

import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#/\\_10";
const FRAMES = 14;

/**
 * Editorial decode effect: on hover the text scrambles through random
 * glyphs and settles left-to-right.
 */
export function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const scramble = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    let i = 0;
    const tick = () => {
      i++;
      const settled = Math.ceil((i / FRAMES) * text.length);
      el.textContent =
        text.slice(0, settled) +
        text
          .slice(settled)
          .split("")
          .map((c) =>
            c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("");
      if (i < FRAMES) frame.current = requestAnimationFrame(tick);
      else el.textContent = text;
    };
    frame.current = requestAnimationFrame(tick);
  };

  return (
    <span ref={ref} onMouseEnter={scramble} className={className}>
      {text}
    </span>
  );
}
