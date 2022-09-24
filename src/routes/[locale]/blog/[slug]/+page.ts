import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Blogpost } from "@types";

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const request = await fetch(`/api/blogpost/${encodeURI(params.slug)}`);
		const { filepath }: Blogpost = await request.json();

		let post = null;
		const modules = import.meta.glob("/src/content/blogpost/**/*.svx");

		for (const [ filepathName, module ] of Object.entries(modules)) {
			if (filepathName.includes(filepath)) {
				post = await module();
				break;
			}
		}

		return {
			Post: post.default
		};

	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
