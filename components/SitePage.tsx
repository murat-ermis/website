import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Tech } from "@/components/sections/Tech";
import { WhatIDo } from "@/components/sections/WhatIDo";
import type { Locale } from "@/content/i18n";

/** The whole site: one page, one scroll, six anchored sections. */
export function SitePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <WhatIDo locale={locale} />
      <About locale={locale} />
      <Tech locale={locale} />
      <Experience locale={locale} />
      <Projects locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
