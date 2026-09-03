import { Card, Tag } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/content/i18n";
import { projects, ui } from "@/content/site";

export function Projects({ locale }: { locale: Locale }) {
  return (
    <Section
      id="projeler"
      eyebrow={ui.projectsEyebrow[locale]}
      title={ui.projectsTitle[locale]}
      lead={ui.projectsLead[locale]}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.slug} className="flex flex-col">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-100">
                {project.title[locale]}
              </h3>
              <span className="shrink-0 font-mono text-xs text-slate-500">
                {project.year}
              </span>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
              {project.description[locale]}
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
                    {ui.sourceCode[locale]} →
                  </a>
                ) : null}
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-sky-400 transition hover:text-sky-300"
                  >
                    {ui.liveDemo[locale]} →
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
