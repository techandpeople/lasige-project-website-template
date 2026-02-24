/**
 * Prepends the Astro base URL to a public asset path.
 * The base URL is set via the BASE_PATH environment variable at build time
 * and configured in astro.config.mjs. Change BASE_PATH in the GitHub Actions
 * workflow (.github/workflows/deploy.yml) to update the deployment prefix.
 *
 * Examples:
 *   withBase('/images/gallery/photo.jpg') → '/project-template/images/gallery/photo.jpg'
 *   withBase('/favicon.svg')              → '/project-template/favicon.svg'
 */
export function withBase(path: string | undefined | null): string {
  if (!path) return path ?? '';
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
