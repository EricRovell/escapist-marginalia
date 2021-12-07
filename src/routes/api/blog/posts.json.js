import { dev } from "$app/env";
import { getPosts } from "@core/getPosts";

export async function get({ query }) {
	const sort = query.get("sort");
	let posts = await getPosts();

	if (sort) {
		posts.sort((a, b) => (a.created > b.created ? Number(sort) : 1));
	}

	return {
		// render all posts during development
		body: posts.filter(post => dev || post.published)
	};
}