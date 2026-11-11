import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build` produces the normal multi-file build for Cloudflare.
// `npm run build:preview` produces a single self-contained index.html
// that can be opened straight from disk for a quick look.
export default defineConfig(({ mode }) => {
  const isPreview = mode === "preview";
  return {
    plugins: [react(), tailwindcss(), ...(isPreview ? [viteSingleFile()] : [])],
    build: {
      outDir: isPreview ? "dist-preview" : "dist",
    },
  };
});
