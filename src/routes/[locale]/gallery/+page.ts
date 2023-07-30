import { error } from "@sveltejs/kit";
import type { GalleryItem } from "@types";
import type { PageLoad } from "./$types";
	
export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const { locale = "en" } = params;
		const res = await fetch("/api/gallery");
		const items: GalleryItem[] = await res.json();

		return {
			items: items.filter(item => item.lang === locale)
		};
	} catch (err) {
		throw error(404, `Could not load: ${err.message}`);
	}
};
