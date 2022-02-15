import { 
	addMessages
} from "svelte-intl-precompile";
export {
	init,
	t,
	locales,
	locale
} from "svelte-intl-precompile";

import ru from "$locales/ru.json";
import en from "$locales/en.json";

export function loadMessages(): void {
	addMessages("ru", ru);
	addMessages("en", en);

	/**
	 * TODO: manage locales async, using `register()` and `waitLocale()`
	 * 
	 * register("en", () => import("$locales/en.json"));
	 */
}

export const supportedLocales = [ "en", "ru" ];

export function validateLocale(locale: string, fallback = "en"): string {
	return supportedLocales.includes(locale)
		? locale
		: fallback;
}