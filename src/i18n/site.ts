import site from '../../site-config.yaml';

/**
 * Returns the site config with language-specific overrides applied.
 * Shared keys (colors, sectionOrder, navigation, etc.) remain as-is.
 * Language-specific keys from site.i18n[lang] override top-level keys.
 */
export function getSiteConfig(lang: string): Record<string, any> {
  const langOverrides = site.i18n?.[lang] ?? {};
  return {
    ...site,
    hero: { ...site.hero, ...langOverrides.hero },
    deliverables: { ...site.deliverables, ...langOverrides.deliverables },
    gallery: { ...site.gallery, ...langOverrides.gallery },
    team: { ...site.team, ...langOverrides.team },
    funding: { ...site.funding, ...langOverrides.funding },
    contact: langOverrides.contact
      ? { ...site.contact, ...langOverrides.contact }
      : site.contact,
    footer: { ...site.footer, ...langOverrides.footer },
    recruitment: langOverrides.recruitment
      ? { ...site.recruitment, ...langOverrides.recruitment }
      : site.recruitment,
    stats: langOverrides.stats
      ? { ...(site as any).stats, ...langOverrides.stats }
      : (site as any).stats,
  };
}
