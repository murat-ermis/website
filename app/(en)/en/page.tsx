import type { Metadata } from "next";
import { SitePage } from "@/components/SitePage";
import { buildMetadata } from "@/content/metadata";

export const metadata: Metadata = buildMetadata("en");

export default function EnglishHome() {
  return <SitePage locale="en" />;
}
