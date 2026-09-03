import type { ReactNode } from "react";
import { geistMono, geistSans } from "@/app/fonts";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import type { Locale } from "@/content/i18n";
import { ui } from "@/content/site";

/**
 * The document shell. Each locale has its own root layout so `<html lang>` is
 * correct in the exported HTML rather than being patched in the browser.
 */
export function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="page-glow flex min-h-full flex-col">
        <a
          href="#tanitim"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-sky-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-950"
        >
          {ui.skipToContent[locale]}
        </a>
        <NavBar locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
