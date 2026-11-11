import manifest from "../data/images.json";

export type ImageName = keyof typeof manifest;

const useLocal = import.meta.env.VITE_LOCAL_IMAGES === "true";

/**
 * Returns the URL for a site image.
 * Until `npm run images` has been run, images load from Squarespace's CDN.
 * Set VITE_LOCAL_IMAGES=true to serve the downloaded copies from /images/.
 */
export function img(name: ImageName, width?: number): string {
  if (useLocal) return `/images/${name}`;
  const url = new URL(manifest[name]);
  if (width) url.searchParams.set("format", `${width}w`);
  return url.toString();
}
