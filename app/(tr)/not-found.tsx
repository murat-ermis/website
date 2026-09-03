import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ui } from "@/content/site";

export default function NotFound() {
  return (
    <Section eyebrow="404" title={ui.notFoundTitle.tr} lead={ui.notFoundLead.tr}>
      <Link
        href="/"
        className="inline-block rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
      >
        {ui.backHome.tr}
      </Link>
    </Section>
  );
}
