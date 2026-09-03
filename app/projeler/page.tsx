import type { Metadata } from "next";
import { Card, Tag } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Yaptıklarım",
  description:
    "Üzerinde çalıştığım projeler: dağıtık sistemler, geliştirici platformları ve web arayüzleri.",
};

export default function ProjectsPage() {
  return (
    <Section
      eyebrow="Yaptıklarım"
      title="Projeler"
      lead="Hem üretimde çalışan sistemler hem de öğrenmek için kurduğum yan projeler."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.slug} className="flex flex-col">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-100">
                {project.title}
              </h2>
              <span className="shrink-0 font-mono text-xs text-slate-500">
                {project.year}
              </span>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            {project.repo || project.href ? (
              <div className="mt-5 flex gap-4 border-t border-white/10 pt-4">
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-sky-400 transition hover:text-sky-300"
                  >
                    Kaynak kodu →
                  </a>
                ) : null}
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-sky-400 transition hover:text-sky-300"
                  >
                    Canlı demo →
                  </a>
                ) : null}
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </Section>
  );
}
