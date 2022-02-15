import type { GetSession } from "@sveltejs/kit";

export const getSession: GetSession = event => {
	const languages = event.request.headers.get("accept-language");

	return languages
		? { userLanguage: languages.slice(0, 2) }
		: {};
};