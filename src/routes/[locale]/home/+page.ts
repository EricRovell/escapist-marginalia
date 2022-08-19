import { error } from "@sveltejs/kit";
import { getBlogposts } from "@data/posts";
import { getGalleryItems } from "@data/photos";
import { getProjects } from "@data/projects";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	try {
		const [	blogposts, photos, projects ] = await Promise.all([
			getBlogposts(),
			getGalleryItems(),
			getProjects()
		]);

		return {
			blogposts: blogposts.slice(0, 4),
			photos: photos.slice(0, 4),
			projects: projects.slice(0, 4)
		};
	} catch (err) {
		throw error(404, `Something is wrong: ${err.message}`);
	}
};
