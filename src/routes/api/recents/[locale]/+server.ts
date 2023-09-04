import { getProjects } from "@data/projects";
import { getBlogposts } from "@data/posts";
import { getGalleryItems } from "@data/gallery";
import type { Locale } from "@types";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
	const { locale = "en" } = params as { locale: Locale };

	try {
		const [ blogposts, gallery, projects ] = await Promise.all([
			getBlogposts({
				lang: locale,
				draft: false
			}, {
				limit: 4
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

		return new Response(
			JSON.stringify({
				blogposts,
				gallery,
				projects
			})
		);
	} catch (error) {
		throw error(404, `Something is wrong: ${error.message}`);
	}
};
