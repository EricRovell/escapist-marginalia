import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	const { lang = "en", slug } = params;

	try {
		const post = await import(`../../../content/blogpost/${slug}/index-${lang}.svx`);
		return {
			Post: post.default
		};
	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
