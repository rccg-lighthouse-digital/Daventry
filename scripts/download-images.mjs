// Downloads every image the site uses from Squarespace into public/images/.
// Run this BEFORE the Squarespace site is deleted:  npm run images
// Then build with VITE_LOCAL_IMAGES=true (set in .env) so the site serves its own copies.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(await readFile(path.join(root, "src/data/images.json"), "utf8"));
const outDir = path.join(root, "public/images");
await mkdir(outDir, { recursive: true });

let ok = 0;
let failed = 0;
for (const [name, src] of Object.entries(manifest)) {
  const dest = path.join(outDir, name);
  if (existsSync(dest)) {
    ok++;
    continue;
  }
  // Ask Squarespace for a sensible web size rather than the original camera file.
  const url = new URL(src);
  url.searchParams.set("format", name.startsWith("logo") ? "500w" : "2500w");
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    console.log(`✓ ${name}`);
    ok++;
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
    failed++;
  }
}
console.log(`\n${ok} saved, ${failed} failed. Images are in public/images/`);
if (failed) process.exitCode = 1;
