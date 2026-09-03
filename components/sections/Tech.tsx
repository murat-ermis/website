import { AmbientField } from "@/components/scene/AmbientField";
import { TechOrbit } from "@/components/scene/TechOrbit";
import { Card, Tag } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/content/i18n";
import { skills, ui } from "@/content/site";

export function Tech({ locale }: { locale: Locale }) {
  return (
    <div className="relative isolate overflow-hidden border-y border-white/5">
      {/* Full-bleed drifting shards behind the section. */}
      <AmbientField />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/60 to-ink-950/90" />

      <Section
        className="relative"
        eyebrow={ui.techEyebrow[locale]}
        title={ui.techTitle[locale]}
        lead={ui.techLead[locale]}
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <TechOrbit className="order-2 h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] lg:order-1 lg:h-96" />

          <div className="order-1 grid gap-5 sm:grid-cols-2 lg:order-2">
            {skills.map((group) => (
              <Card key={group.group.en} className="backdrop-blur-sm">
                <h3 className="text-sm font-semibold text-slate-100">
                  {group.group[locale]}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const label = typeof item === "string" ? item : item[locale];
                    const key = typeof item === "string" ? item : item.en;
                    return <Tag key={key}>{label}</Tag>;
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
