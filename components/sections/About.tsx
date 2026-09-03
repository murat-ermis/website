import { FlowNetwork } from "@/components/scene/FlowNetwork";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/content/i18n";
import { profile, ui } from "@/content/site";

export function About({ locale }: { locale: Locale }) {
  return (
    <Section
      id="hakkimda"
      eyebrow={ui.aboutEyebrow[locale]}
      title={ui.aboutTitle[locale]}
    >
      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-4 text-pretty leading-relaxed text-slate-400">
          <p className="text-lg text-slate-300">{profile.summary[locale]}</p>
          <p>{ui.aboutBody2[locale]}</p>
          <p>{ui.aboutBody3[locale]}</p>
        </div>

        <div className="space-y-5">
          {/* The payment path, drawn: storefront to gateway to bank and back. */}
          <FlowNetwork className="h-56 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]" />

          <Card>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500">
                  {locale === "tr" ? "Konum" : "Location"}
                </dt>
                <dd className="mt-1 text-slate-200">{profile.location[locale]}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500">
                  {locale === "tr" ? "Rol" : "Role"}
                </dt>
                <dd className="mt-1 text-slate-200">{profile.role[locale]}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs uppercase tracking-wider text-slate-500">
                  {locale === "tr" ? "E-posta" : "Email"}
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sky-400 transition hover:text-sky-300"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </Section>
  );
}
