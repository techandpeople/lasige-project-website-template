import en from './en.yaml';
import pt from './pt.yaml';
import site from '../../site-config.yaml';

export type UIStrings = typeof en;

const translations: Record<string, UIStrings> = { en, pt };

const projectLangs: string[] = site.project?.languages ?? ['en'];
export const defaultLang = site.project?.defaultLanguage ?? 'en';
export const supportedLangs = projectLangs.filter((l: string) => l in translations);

/**
 * Returns the full UI strings object for a language.
 * Falls back to defaultLang for any missing language.
 */
export function t(lang: string): UIStrings {
  return translations[lang] ?? translations[defaultLang];
}

/**
 * Given an Astro params.lang value, returns the resolved language code.
 */
export function getLang(paramsLang: string | undefined): string {
  return paramsLang && supportedLangs.includes(paramsLang) ? paramsLang : defaultLang;
}

/**
 * Build a path for a given language. Always prefixed: '/en/', '/pt/', etc.
 */
export function langPath(lang: string): string {
  return `/${lang}/`;
}

/**
 * Extract the language from a content entry ID.
 * Entry IDs follow the pattern "<lang>/<type>/<filename>" (e.g. "en/sections/about").
 * The first path segment is the language.
 */
export function langFromId(id: string): string {
  return id.split('/')[0] ?? defaultLang;
}

/**
 * Extract the base content key from an entry ID, stripping the language prefix.
 * "en/sections/about" → "about"
 * "pt/team/pi"        → "pi"
 */
export function contentId(id: string): string {
  const parts = id.split('/');
  return parts[parts.length - 1] ?? id;
}

/**
 * Filter and resolve content entries for a given language with fallback to default.
 * For each entry in the default language, use the localized version if available.
 */
export function getLocalizedEntries<T extends { id: string }>(
  allEntries: T[],
  lang: string,
): T[] {
  const defaultEntries = allEntries.filter((e) => langFromId(e.id) === defaultLang);
  if (lang === defaultLang) return defaultEntries;

  const localizedEntries = allEntries.filter((e) => langFromId(e.id) === lang);
  return defaultEntries.map((fallback) => {
    const base = contentId(fallback.id);
    const localized = localizedEntries.find((l) => contentId(l.id) === base);
    return localized ?? fallback;
  });
}
