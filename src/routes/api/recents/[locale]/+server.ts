import { getProjects } from "@data/projects";
import { getBlogposts } from "@data/posts";
import { getGalleryItems } from "@data/gallery";
import { getSketches } from "@data/sketch";
import type { Locale } from "@types";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
	const { locale = "en" } = params as { locale: Locale };

	try {
		const [ blogposts, gallery, projects, sketches ] = await Promise.all([
			getBlogposts({
				lang: locale,
				draft: false
			}, {
				limit: 5
			}),
			getGalleryItems({
				lang: locale,
				draft: false
			}, {
				limit: 5
			}),
			getProjects({
				featured: true,
				lang: locale,
				draft: false
			}, {
				limit: 5
			}),
			getSketches({
				lang: locale
			}, {
				limit: 5
			})
		]);

		return new Response(
			JSON.stringify({
				blogposts,
				gallery,
				projects,
				sketches
			})
		);
	} catch (error) {
		throw error(404, `Something is wrong: ${error.message}`);
	}
};
