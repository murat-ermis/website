import { HeroStage } from "@/components/scene/HeroStage";
import type { Locale } from "@/content/i18n";
import { profile, ui } from "@/content/site";

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section
      id="tanitim"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-10 pt-10 sm:px-8 sm:pt-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            {profile.availability[locale]}
          </span>

          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
            {ui.greeting[locale]}{" "}
            <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
              {profile.name}
            </span>
            .
          </h1>

          <p className="mt-3 font-mono text-sm text-sky-400/90">
            {profile.headline[locale]}
          </p>

          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-slate-400">
            {profile.tagline[locale]}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projeler"
              className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              {ui.seeWork[locale]}
            </a>
            <a
              href="#iletisim"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/35 hover:bg-white/5"
            >
              {ui.getInTouch[locale]}
            </a>
          </div>
        </div>

        <HeroStage locale={locale} />
      </div>
    </section>
  );
}
