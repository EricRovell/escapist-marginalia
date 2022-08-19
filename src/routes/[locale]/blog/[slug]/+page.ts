import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
	const { slug } = params;
	const request = await fetch(`/api/blogpost/${encodeURI(slug)}`);
	const { filepath } = await request.json();
	const [ dir, file ] = filepath.split("/");

	try {
		const post = await import(`../../../../content/blogpost/${dir}/${file}.svx`);
		return {
			Post: post.default
		};
	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
