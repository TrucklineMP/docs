// Single source of truth for the translation locales. Used by astro.config.mjs
// (Starlight locales), scripts/validate-docs.mjs, Banner.astro and
// TranslationStatusTable.astro. Adding a locale here is enough: its folder in
// src/content/docs/<code>/ is then validated, gets the outdated banner and a
// column on the Translation Status page.
//
// Plain .mjs (not .ts) so the Node validation script can import it directly.

/** @type {Record<string, { label: string; lang: string; englishName: string }>} */
export const translationLocales = {
	ru: { label: 'Русский', lang: 'ru', englishName: 'Russian' },
	pl: { label: 'Polski', lang: 'pl', englishName: 'Polish' },
	de: { label: 'Deutsch', lang: 'de', englishName: 'German' },
	fr: { label: 'Français', lang: 'fr', englishName: 'French' },
	'zh-cn': { label: '简体中文', lang: 'zh-CN', englishName: 'Chinese (Simplified)' },
	ta: { label: 'தமிழ்', lang: 'ta', englishName: 'Tamil' },
	tr: { label: 'Türkçe', lang: 'tr', englishName: 'Turkish' },
	pt: { label: 'Português (Portugal)', lang: 'pt-PT', englishName: 'Portuguese (Portugal)' },
	'pt-br': { label: 'Português (Brasil)', lang: 'pt-BR', englishName: 'Portuguese (Brazil)' },
};

/** Locale codes of every translation (English is the root locale, not listed). */
export const LOCALES = Object.keys(translationLocales);

/** Locales in the shape Starlight's `locales` option expects. */
export const starlightLocales = {
	root: { label: 'English', lang: 'en' },
	...Object.fromEntries(
		Object.entries(translationLocales).map(([code, { label, lang }]) => [code, { label, lang }])
	),
};
