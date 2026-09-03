export const LOCALES = ["tr", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "tr";

/** A string that exists in both languages. */
export type Localized = Record<Locale, string>;

export const pick = (value: Localized, locale: Locale) => value[locale];

/** Where each locale lives, used by the language switcher and hreflang tags. */
export const localePath: Record<Locale, "/" | "/en"> = {
  tr: "/",
  en: "/en",
};

export const localeLabel: Record<Locale, string> = {
  tr: "Türkçe",
  en: "English",
};

export const localeShort: Record<Locale, string> = {
  tr: "TR",
  en: "EN",
};

export const otherLocale = (locale: Locale): Locale =>
  locale === "tr" ? "en" : "tr";
