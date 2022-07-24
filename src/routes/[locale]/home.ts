import { getBlogposts } from "@data/posts";
import { getPhotos } from "@data/photos";
import { getProjects } from "@data/projects";

export const GET = async () => {
	const [	blogposts, photos, projects ] = await Promise.all([
		getBlogposts(),
		getPhotos(),
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