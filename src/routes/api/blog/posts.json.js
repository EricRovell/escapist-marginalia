import { getPosts } from "@core/getPosts";

export async function get({ query }) {
	const sort = query.get("sort");
	let posts = await getPosts();

	if (sort) {
		posts.sort((a, b) => (a.date > b.date ? Number(sort) : 1));
	}

	return {
		body: posts
	};
}