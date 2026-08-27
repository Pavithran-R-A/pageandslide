import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { SITE_METADATA } from "./client/src/config/site";

const metadataTokens: Readonly<Record<string, string>> = {
  "{{SITE_TITLE}}": SITE_METADATA.title,
  "{{SITE_DESCRIPTION}}": SITE_METADATA.description,
  "{{SITE_CANONICAL_URL}}": SITE_METADATA.canonicalUrl,
  "{{SITE_SOCIAL_IMAGE_URL}}": SITE_METADATA.socialImageUrl,
};

function applyMetadataTokens(html: string): string {
  return Object.entries(metadataTokens).reduce((result, [token, value]) => result.replaceAll(token, value), html);
}

export default defineConfig({
  plugins: [react(), tailwindcss(), jsxLocPlugin(), { name: "softbazzar-canonical-metadata", transformIndexHtml: applyMetadataTokens }],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: { outDir: path.resolve(import.meta.dirname, "dist/public"), emptyOutDir: true },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [".manuspre.computer", ".manus.computer", ".manus-asia.computer", ".manuscomputer.ai", ".manusvm.computer", "localhost", "127.0.0.1"],
    fs: { strict: true, deny: ["**/.*"] },
  },
});
