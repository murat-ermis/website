import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { localePath } from "./i18n";
import { profile } from "./site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://murat-ermis.github.io";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Shared metadata for both locales, including the hreflang pair. */
export function buildMetadata(locale: Locale): Metadata {
  const title = `${profile.name} — ${profile.role[locale]}`;
  const description = profile.tagline[locale];
  const path = `${basePath}${localePath[locale]}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        tr: `${basePath}/`,
        en: `${basePath}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "tr" ? "tr_TR" : "en_US",
      title,
      description,
      siteName: profile.name,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
