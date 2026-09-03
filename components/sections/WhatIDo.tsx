import { CodeRain } from "@/components/scene/CodeRain";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/content/i18n";
import { ui } from "@/content/site";

export function WhatIDo({ locale }: { locale: Locale }) {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Falling code behind the whole section. */}
      <CodeRain />
      <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b from-ink-950 via-ink-950/55 to-ink-950" />

      <Section
        className="relative"
        eyebrow={ui.whatIDoEyebrow[locale]}
        title={ui.whatIDoTitle[locale]}
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ui.cards.map((card) => (
            <Card key={card.title.en} className="backdrop-blur-sm">
              <h3 className="text-base font-semibold text-slate-100">
                {card.title[locale]}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {card.body[locale]}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
