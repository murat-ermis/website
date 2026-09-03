import type { Locale } from "@/content/i18n";
import { profile, sections, socials, ui } from "@/content/site";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-16 border-t border-white/10 bg-ink-950/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">{profile.name}</p>
          <p className="mt-1.5 text-sm text-slate-400">{profile.role[locale]}</p>
          <p className="mt-1 text-sm text-slate-500">{profile.location[locale]}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {ui.footerPages[locale]}
          </p>
          <ul className="mt-3 space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-slate-400 transition hover:text-sky-300"
                >
                  {section.label[locale]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {ui.footerLinks[locale]}
          </p>
          <ul className="mt-3 space-y-2">
            {socials.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="text-sm text-slate-400 transition hover:text-sky-300"
                >
                  {typeof item.label === "string" ? item.label : item.label[locale]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-5 py-6 text-center text-xs text-slate-600 sm:px-8">
        © {new Date().getFullYear()} {profile.name}. {ui.builtWith[locale]}
      </div>
    </footer>
  );
}
