import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo>, so every asset and route has
// to be prefixed. The value is injected by the deploy workflow; local builds and
// custom-domain builds leave it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Pages has no Next.js image optimizer behind it.
  images: { unoptimized: true },
  // Emit /route/index.html so static hosting resolves clean URLs.
  trailingSlash: true,
  typedRoutes: true,
};

export default nextConfig;
