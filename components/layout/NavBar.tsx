"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { type Locale, localeLabel, localeShort } from "@/content/i18n";
import { profile, sections, ui } from "@/content/site";

const SWITCH =
  "rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs font-semibold text-slate-300 transition hover:border-sky-400/50 hover:text-sky-300";

export function NavBar({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);
    if (targets.length === 0) return;

    // Highlights whichever section currently owns the upper half of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.05, 0.3, 0.6] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
      <nav
        aria-label={locale === "tr" ? "Ana menü" : "Main menu"}
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
      >
        <a
          href="#tanitim"
          className="group flex shrink-0 items-center gap-2.5 text-sm font-semibold tracking-tight text-slate-100"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-violet-500 font-mono text-xs font-bold text-slate-950">
            ME
          </span>
          <span className="hidden transition group-hover:text-white sm:inline">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={active === section.id ? "true" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition ${
                  active === section.id
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                }`}
              >
                {section.label[locale]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {locale === "tr" ? (
            <Link href="/en" hrefLang="en" title={localeLabel.en} className={SWITCH}>
              {localeShort.en}
            </Link>
          ) : (
            <Link href="/" hrefLang="tr" title={localeLabel.tr} className={SWITCH}>
              {localeShort.tr}
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-lg border border-white/15 px-3 py-2 text-sm text-slate-200 md:hidden"
          >
            {open ? ui.close[locale] : ui.menu[locale]}
          </button>
        </div>
      </nav>

      {open ? (
        <ul id="mobile-menu" className="border-t border-white/10 px-5 pb-4 pt-2 md:hidden">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {section.label[locale]}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
