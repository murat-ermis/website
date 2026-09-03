import type { Metadata } from "next";
import { SitePage } from "@/components/SitePage";
import { buildMetadata } from "@/content/metadata";

export const metadata: Metadata = buildMetadata("tr");

export default function TurkishHome() {
  return <SitePage locale="tr" />;
}
