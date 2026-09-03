import type { Metadata } from "next";
import { Card, Tag } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { profile, skills, timeline } from "@/content/site";

export const metadata: Metadata = {
  title: "Hakkımda",
  description: profile.summary,
};

export default function AboutPage() {
  return (
    <>
      <Section eyebrow="Hakkımda" title={`${profile.name} kimdir?`}>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4 text-pretty leading-relaxed text-slate-400">
            <p className="text-lg text-slate-300">{profile.summary}</p>
            <p>
              İşimin en sevdiğim tarafı, karmaşık bir problemi anlaşılır
              parçalara bölmek. Bir servisin neden yavaşladığını bulmak da,
              bir arayüzün neden hantal hissettirdiğini çözmek de aynı merakla
              başlıyor.
            </p>
            <p>
              Ekip içinde kod incelemelerine, teknik dokümantasyona ve genç
              geliştiricilere mentorluğa vakit ayırmayı önemsiyorum. Uzun vadede
              bir ürünü ayakta tutan şeyin tek tek satırlar değil, ekibin ortak
              alışkanlıkları olduğunu düşünüyorum.
            </p>
          </div>

          <Card>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500">
                  Konum
                </dt>
                <dd className="mt-1 text-slate-200">{profile.location}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500">
                  Rol
                </dt>
                <dd className="mt-1 text-slate-200">{profile.role}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500">
                  Durum
                </dt>
                <dd className="mt-1 text-emerald-300">{profile.availability}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-slate-500">
                  E-posta
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
      </Section>

      <Section eyebrow="Yolculuk" title="Deneyim ve eğitim">
        <ol className="relative space-y-8 border-l border-white/10 pl-6">
          {timeline.map((entry) => (
            <li key={`${entry.period}-${entry.title}`} className="relative">
              <span className="absolute -left-[1.68rem] top-1.5 size-2.5 rounded-full bg-sky-400 ring-4 ring-sky-400/15" />
              <p className="font-mono text-xs text-slate-500">{entry.period}</p>
              <h3 className="mt-1.5 text-base font-semibold text-slate-100">
                {entry.title}
              </h3>
              <p className="text-sm text-sky-400/90">{entry.org}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                {entry.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Yetkinlikler" title="Teknolojiler">
        <div className="space-y-6">
          {skills.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm font-semibold text-slate-300">
                {group.group}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
