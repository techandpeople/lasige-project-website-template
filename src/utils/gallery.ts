import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const extensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg']);

/**
 * Returns the list of gallery images from public/images/gallery/.
 * Using import.meta.url in a .ts file (not .astro) guarantees a reliable
 * filesystem path during Vite/Astro builds.
 */
export function getGalleryImages(base: string): { src: string; alt: string }[] {
  const utilsDir = fileURLToPath(new URL('.', import.meta.url));
  // src/utils/ → ../../ → project root → public/images/gallery
  const galleryDir = path.join(utilsDir, '../../public/images/gallery');

  if (!fs.existsSync(galleryDir)) return [];

  const basePrefix = base.replace(/\/$/, '');

  return fs.readdirSync(galleryDir)
    .filter((f) => extensions.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => ({
      src: `${basePrefix}/images/gallery/${f}`,
      alt: f.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    }));
}

/**
 * Returns true if there are any images in public/images/gallery/.
 */
export function hasGalleryImages(): boolean {
  const utilsDir = fileURLToPath(new URL('.', import.meta.url));
  const galleryDir = path.join(utilsDir, '../../public/images/gallery');

  return fs.existsSync(galleryDir) &&
    fs.readdirSync(galleryDir).some((f) => extensions.has(path.extname(f).toLowerCase()));
}
