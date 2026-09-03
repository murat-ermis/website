import { Geist, Geist_Mono } from "next/font/google";

// Shared between both root layouts so the font is only instantiated once.
export const geistSans = Geist({
  variable: "--font-geist-sans",
  // latin-ext carries the Turkish glyphs: ş, ğ, ı, İ, ç, ö, ü.
  subsets: ["latin", "latin-ext"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});
