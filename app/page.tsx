import Link from "next/link";
import { HeroStage } from "@/components/scene/HeroStage";
import { Card, Tag } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { profile, projects, skills } from "@/content/site";

export default function HomePage() {
  const featured = projects.filter((p) => p.highlight).slice(0, 2);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-10 sm:px-8 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              {profile.availability}
            </span>

            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              Merhaba, ben{" "}
              <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                {profile.name}
              </span>
              .
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-slate-400">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projeler"
                className="rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Yaptıklarıma göz at
              </Link>
              <Link
                href="/iletisim"
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-white/35 hover:bg-white/5"
              >
                İletişime geç
              </Link>
            </div>
          </div>

          <HeroStage />
        </div>
      </section>

      <Section
        eyebrow="Ne yapıyorum"
        title="Fikirden üretime kadar tüm yolculuk"
        lead="Ürünün mimarisini kurmaktan dağıtım hattını kurgulamaya kadar geniş bir alanda çalışıyorum."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Backend mimarisi",
              body: "Dağıtık servisler, olay tabanlı akışlar ve doğru ölçeklenen veri modelleri tasarlıyorum.",
            },
            {
              title: "Modern arayüzler",
              body: "React ve Next.js ile hızlı, erişilebilir ve akıcı arayüzler geliştiriyorum.",
            },
            {
              title: "Dağıtım ve altyapı",
              body: "Kubernetes, Helm ve GitHub Actions ile tekrarlanabilir dağıtım hatları kuruyorum.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-slate-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Öne çıkanlar" title="Son çalışmalarımdan birkaçı">
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <Card key={project.slug}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-100">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-slate-500">
                  {project.year}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/projeler"
            className="text-sm font-medium text-sky-400 transition hover:text-sky-300"
          >
            Tüm projeleri gör →
          </Link>
        </div>
      </Section>

      <Section eyebrow="Araç kutusu" title="Günlük olarak kullandıklarım">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <Card key={group.group}>
              <h3 className="text-sm font-semibold text-slate-100">
                {group.group}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="font-mono text-sm text-slate-400">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
