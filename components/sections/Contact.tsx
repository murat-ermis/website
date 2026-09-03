import { ContactBeacon } from "@/components/scene/ContactBeacon";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/content/i18n";
import { socials, ui } from "@/content/site";

export function Contact({ locale }: { locale: Locale }) {
  return (
    <Section
      id="iletisim"
      eyebrow={ui.contactEyebrow[locale]}
      title={ui.contactTitle[locale]}
      lead={ui.contactLead[locale]}
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="grid gap-5 sm:grid-cols-2">
          {socials.map((item) => {
            const label =
              typeof item.label === "string" ? item.label : item.label[locale];
            return (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-sky-400/40 hover:bg-sky-400/[0.06]"
              >
                <p className="text-sm font-semibold text-slate-100">{label}</p>
                <p className="mt-1.5 break-all font-mono text-sm text-slate-400">
                  {item.handle}
                </p>
                <p className="mt-4 text-sm font-medium text-sky-400 transition group-hover:text-sky-300">
                  {ui.open[locale]} →
                </p>
              </a>
            );
          })}
        </div>

        <ContactBeacon className="h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] lg:h-80" />
      </div>
    </Section>
  );
}
