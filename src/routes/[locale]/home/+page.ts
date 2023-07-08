import { error } from "@sveltejs/kit";
import { getBlogposts } from "@data/posts";
import { getGalleryItems } from "@data/gallery";
import { getProjects } from "@data/projects";
import type { Locale } from "@types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	const { locale = "en" } = params as { locale: Locale };

	try {
		const [ blogposts, gallery, projects ] = await Promise.all([
			getBlogposts({
				lang: locale,
				draft: false
			}),
			getGalleryItems({
				lang: locale,
				draft: false
			}, {
				limit: 5
			}),
			getProjects({
				featured: true,
				lang: locale
			}, {
				limit: 4
			})
		]);

		return {
			blogposts: blogposts.slice(0, 4),
			photos: gallery.slice(0, 4),
			projects: projects.slice(0, 4)
		};
	} catch (err) {
		throw error(404, `Something is wrong: ${err.message}`);
	}
};
