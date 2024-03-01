import { redirect } from "@sveltejs/kit";
import { init, loadMessages, validateLocale, supportedLocales } from "@core/i18n";
import type { LayoutLoad } from "./$types";

export const prerender = true;

export const load: LayoutLoad = ({ params, url }) => {
	loadMessages();

	const locale = validateLocale(params.locale);

	init({
		initialLocale: locale,
		fallbackLocale: "ru"
	});

	if (url.pathname === "/" || !supportedLocales.includes(params.locale)) {
		throw redirect(303, `/${locale}/home`);
	}

	return {};
};
