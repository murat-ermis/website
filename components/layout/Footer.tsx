import Link from "next/link";
import { nav, profile, socials } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink-950/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">{profile.name}</p>
          <p className="mt-1.5 text-sm text-slate-400">{profile.role}</p>
          <p className="mt-1 text-sm text-slate-500">{profile.location}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Sayfalar
          </p>
          <ul className="mt-3 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-slate-400 transition hover:text-sky-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Bağlantılar
          </p>
          <ul className="mt-3 space-y-2">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="text-sm text-slate-400 transition hover:text-sky-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-5 py-6 text-center text-xs text-slate-600 sm:px-8">
        © {new Date().getFullYear()} {profile.name}. Next.js ve Three.js ile
        yapıldı.
      </div>
    </footer>
  );
}
