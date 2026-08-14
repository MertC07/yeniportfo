"use client";

import { useState } from "react";
import { useContent, useLocale } from "@/components/providers/locale-provider";

type Field = "name" | "email" | "message";
type Status = "idle" | "sending" | "sent" | "error";

const FIELD_CLASS =
  "w-full rounded-xl border hairline bg-surface/60 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted/70 focus:border-accent";

/**
 * The page offered a `mailto:` link and nothing else, which quietly asks the
 * visitor to have a mail client configured — on a phone, often nobody does,
 * and the tap does nothing at all. This posts to /api/contact instead.
 *
 * The address stays on the page beneath it: if the send fails, or the
 * server has no API key, there is still a way through.
 */
export function ContactForm() {
  const { profile, ui } = useContent();
  const locale = useLocale();
  const t = ui.sections.contact.form;

  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<Field[]>([]);
  const [notice, setNotice] = useState("");
  const [showAddress, setShowAddress] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    // Held in a variable: `currentTarget` is nulled once the handler
    // returns, and every use below is on the far side of an await.
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setInvalid([]);
    setNotice("");
    setShowAddress(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
          locale,
        }),
      });
      const payload = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("sent");
        setNotice(t.sent);
        form.reset();
        return;
      }

      setStatus("error");
      if (payload.error === "invalid") {
        setInvalid(Array.isArray(payload.fields) ? payload.fields : []);
        setNotice(t.invalid);
      } else if (payload.error === "rate_limited") {
        setNotice(t.rateLimited);
      } else {
        // Only here is the address worth offering. A rejected field or a
        // spent allowance is the visitor's to fix; a failed send is not.
        setNotice(t.failed);
        setShowAddress(true);
      }
    } catch {
      setStatus("error");
      setNotice(t.failed);
      setShowAddress(true);
    }
  }

  const mark = (field: Field) =>
    invalid.includes(field) ? "border-accent" : "";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mt-16 w-full max-w-xl text-left"
    >
      <p className="microlabel text-center">{t.title}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="microlabel">{t.name}</span>
          <input
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder={t.namePlaceholder}
            aria-invalid={invalid.includes("name")}
            className={`${FIELD_CLASS} ${mark("name")}`}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="microlabel">{t.email}</span>
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            aria-invalid={invalid.includes("email")}
            className={`${FIELD_CLASS} ${mark("email")}`}
          />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-2">
        <span className="microlabel">{t.message}</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder={t.messagePlaceholder}
          aria-invalid={invalid.includes("message")}
          className={`${FIELD_CLASS} resize-y ${mark("message")}`}
        />
      </label>

      {/* Bait. Off-screen rather than display:none, which the better bots
          know to skip, and out of the tab order so nobody reaches it by
          keyboard. A filled value is answered with a cheerful 200 that
          sends nothing. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          /* py-3.5 lands the box on 44px, the smallest comfortable thumb
             target; py-3 left it at 40. */
          className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent-ink transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.send}
        </button>

        {/* Announced rather than merely shown: the button does not move and
            a purely visual change below it is easy to miss. */}
        {notice && (
          <p
            role="status"
            className={`text-center text-sm ${
              status === "sent" ? "text-accent" : "text-muted"
            }`}
          >
            {notice}
            {showAddress && (
              <>
                {" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  {profile.email}
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
