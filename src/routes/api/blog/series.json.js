import { getPosts } from "@core/getPosts";

export async function get() {
	const posts = await getPosts();
	const catalogue = {};
	
	// break into series
	posts.map(post => {
		const { series } = post;
		catalogue[series]
			? catalogue[series].push(post)
			: catalogue[series] = [ post ];
	});

	return {
		body: catalogue
	};
}