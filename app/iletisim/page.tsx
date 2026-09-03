import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { profile, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${profile.name} ile iletişime geçin.`,
};

export default function ContactPage() {
  return (
    <Section
      eyebrow="İletişim"
      title="Bir fikriniz mi var?"
      lead="Yeni projeler, iş birlikleri veya sadece merhaba demek için yazabilirsiniz. Genelde bir iş günü içinde dönüş yapıyorum."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {socials.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-sky-400/40 hover:bg-sky-400/[0.06]"
          >
            <p className="text-sm font-semibold text-slate-100">{item.label}</p>
            <p className="mt-1.5 break-all font-mono text-sm text-slate-400">
              {item.handle}
            </p>
            <p className="mt-4 text-sm font-medium text-sky-400 transition group-hover:text-sky-300">
              Aç →
            </p>
          </a>
        ))}
      </div>

      <Card className="mt-8">
        <h2 className="text-base font-semibold text-slate-100">
          Nasıl çalışıyorum?
        </h2>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-400">
          <li>• Kısa bir görüşmeyle ihtiyacı ve kapsamı netleştiriyoruz.</li>
          <li>• Teknik yaklaşımı ve zaman planını yazılı olarak paylaşıyorum.</li>
          <li>• Küçük parçalar hâlinde teslim ediyor, her adımda geri bildirim alıyorum.</li>
        </ul>
      </Card>
    </Section>
  );
}
