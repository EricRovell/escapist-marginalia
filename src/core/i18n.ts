import { derived } from "svelte/store";
import { register, init, getLocaleFromNavigator, locale } from "svelte-i18n";

export { _, locale, waitLocale } from "svelte-i18n";

export function i18nInit(lang?: string) {
	register("en", () => import("./dicts/en.json"));
	register("ru", () => import("./dicts/ru.json"));

	void init({
		fallbackLocale: lang || "en",
		initialLocale: getLocaleFromNavigator()
	});
}

/**
 * Derived from `locale` to remove all but used user language.
 */
export const lang = derived(locale, ($locale, set) => {
	set($locale.slice(0, 2));
}, "en");