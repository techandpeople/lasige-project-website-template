import en from './en.yaml';
import pt from './pt.yaml';
import site from '../../site.yaml';

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
 * Given an Astro params.lang value (undefined for default locale),
 * returns the resolved language code.
 */
export function getLang(paramsLang: string | undefined): string {
  return paramsLang && supportedLangs.includes(paramsLang) ? paramsLang : defaultLang;
}

/**
 * Build a path for a given language.
 * Always prefixed: '/en/', '/pt/', etc.
 */
export function langPath(lang: string): string {
  return `/${lang}/`;
}

/**
 * Strip language prefix from a content collection entry ID.
 * "en/about" -> "about", "pt/objectives" -> "objectives"
 */
export function contentId(entryId: string): string {
  const parts = entryId.split('/');
  return parts.length > 1 ? parts.slice(1).join('/') : entryId;
}

/**
 * Filter and resolve content entries for a given language with fallback to default.
 * For each entry in the default language, use the localized version if available.
 */
export function getLocalizedEntries<T extends { id: string; data: { lang?: string } }>(
  allEntries: T[],
  lang: string,
): T[] {
  const fallbackEntries = allEntries.filter((e) => (e.data.lang ?? defaultLang) === defaultLang);
  if (lang === defaultLang) return fallbackEntries;

  const localizedEntries = allEntries.filter((e) => e.data.lang === lang);
  return fallbackEntries.map((fallback) => {
    const id = contentId(fallback.id);
    const localized = localizedEntries.find((l) => contentId(l.id) === id);
    return localized || fallback;
  });
}
