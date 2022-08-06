import { getBlogposts } from "@data/posts";
import { getGalleryItems } from "@data/photos";
import { getProjects } from "@data/projects";

export const GET = async () => {
	const [	blogposts, photos, projects ] = await Promise.all([
		getBlogposts(),
		getGalleryItems(),
		getProjects()
	]);

	return {
		body: {
			blogposts: blogposts.slice(0, 4),
			photos: photos.slice(0, 4),
			projects: projects.slice(0, 4)
		}
	};
};