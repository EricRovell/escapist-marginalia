import { error } from "@sveltejs/kit";
import type { Blogpost, GalleryItem, Project } from "@types";
import type { PageLoad } from "./$types";

interface RecentItems {
	blogposts: Blogpost[];
	gallery: GalleryItem[];
	projects: Project[];
}

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const { locale = "en" } = params;
		const res = await fetch(`/api/recents/${locale}`);
		const items: RecentItems = await res.json();

		return items;
	} catch (err) {
		throw error(404, `Could not load: ${err.message}`);
	}
};
