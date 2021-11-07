import { derived } from "svelte/store";
import { addMessages, init, getLocaleFromNavigator, locale } from "svelte-i18n";

import dictEN from "./dicts/en.json";
import dictRU from "./dicts/ru.json";

export { _, locale } from "svelte-i18n";

export async function i18nInit(lang?: string) {
	addMessages("ru", dictRU);
	addMessages("en", dictEN);

	await init({
		fallbackLocale: lang || "en",
		initialLocale: getLocaleFromNavigator()
	});
}

/**
 * Derived from `locale` to remove all but used user language.
 */
export const lang = derived(locale, $locale => $locale.slice(0, 2));