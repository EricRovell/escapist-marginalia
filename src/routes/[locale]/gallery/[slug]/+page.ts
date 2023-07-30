import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { GalleryItem } from "@types";

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const request = await fetch(`/api/gallery-item/${encodeURI(params.slug)}`);
		const { filepath }: GalleryItem = await request.json();

		let page = null;
		const modules = import.meta.glob("/src/content/gallery/**/*.svx");

		for (const [ filepathName, module ] of Object.entries(modules)) {
			if (filepathName.includes(filepath)) {
				page = await module();
				break;
			}
		}

		return {
			Page: page.default
		};

	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
