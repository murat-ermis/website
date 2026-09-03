import Link from "next/link";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section
      eyebrow="404"
      title="Bu sayfayı bulamadım"
      lead="Aradığınız adres taşınmış ya da hiç var olmamış olabilir."
    >
      <Link
        href="/"
        className="inline-block rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
      >
        Ana sayfaya dön
      </Link>
    </Section>
  );
}
