import type { ReactNode } from "react";
import { RootShell } from "@/components/layout/RootShell";
import "../globals.css";

export default function TurkishRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <RootShell locale="tr">{children}</RootShell>;
}
