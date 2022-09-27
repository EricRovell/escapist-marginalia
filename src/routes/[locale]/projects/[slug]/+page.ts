import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Project } from "@types";

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const request = await fetch(`/api/project/${encodeURI(params.slug)}`);
		const { name }: Project = await request.json();

		let post = null;
		const modules = import.meta.glob("/src/content/project/**/*.svx");

		for (const [ filepathName, module ] of Object.entries(modules)) {
			if (filepathName.includes(name)) {
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
