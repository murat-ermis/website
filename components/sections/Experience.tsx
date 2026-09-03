import { Section } from "@/components/ui/Section";
import type { Locale } from "@/content/i18n";
import { timeline, ui } from "@/content/site";

export function Experience({ locale }: { locale: Locale }) {
  return (
    <Section
      id="deneyim"
      eyebrow={ui.experienceEyebrow[locale]}
      title={ui.experienceTitle[locale]}
    >
      <ol className="relative space-y-9 border-l border-white/10 pl-6">
        {timeline.map((entry) => (
          <li key={`${entry.org}-${entry.period.en}`} className="relative">
            <span className="absolute -left-[1.68rem] top-1.5 size-2.5 rounded-full bg-sky-400 ring-4 ring-sky-400/15" />
            <p className="font-mono text-xs text-slate-500">
              {entry.period[locale]}
            </p>
            <h3 className="mt-1.5 text-base font-semibold text-slate-100">
              {entry.title[locale]}
            </h3>
            <p className="text-sm text-sky-400/90">
              {entry.org}
              <span className="text-slate-500"> · {entry.place[locale]}</span>
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
              {entry.description[locale]}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
