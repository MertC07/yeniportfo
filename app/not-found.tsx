import Link from "next/link";
import { Header } from "@/components/layout/header";

export default function NotFound() {
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
          Lost reel
        </p>
        <h1 className="mt-6 font-display text-display-xl font-extrabold uppercase leading-[0.95] tracking-tight">
          This scene
          <br />
          was cut<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          The page you&apos;re looking for never made the final edit — or it
          moved somewhere quieter.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full border hairline px-6 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink"
        >
          Back to the opening scene
        </Link>
      </main>
    </>
  );
}
