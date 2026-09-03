"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, profile } from "@/content/site";

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // trailingSlash rewrites every route, so compare on a normalised path.
  const current = pathname.replace(/\/+$/, "") || "/";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
      <nav
        aria-label="Ana menü"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-slate-100"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-violet-500 font-mono text-xs font-bold text-slate-950">
            {profile.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
          <span className="transition group-hover:text-white">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = current === item.href.replace(/\/+$/, "") || (item.href === "/" && current === "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobil-menu"
          className="rounded-lg border border-white/15 px-3 py-2 text-sm text-slate-200 md:hidden"
        >
          {open ? "Kapat" : "Menü"}
        </button>
      </nav>

      {open ? (
        <ul
          id="mobil-menu"
          className="border-t border-white/10 px-5 pb-4 pt-2 md:hidden"
        >
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
