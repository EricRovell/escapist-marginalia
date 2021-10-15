import { basename } from "path";

export async function get({ query }) {
	const posts = [];
	const sort = query.get("sort");

	// Import all .svx files in the directory
	const modules = import.meta.glob("/src/routes/content/**/*.svx");

	for await (const [ filename, module ] of Object.entries(modules)) {
		const { metadata } = await module();
		const { title, created } = metadata;

		posts.push({
			title,
			date: new Date(created),
			slug: basename(filename, ".svx")
		});
	}

	if (sort) {
		posts.sort((a, b) => (a.date > b.date ? Number(sort) : 1));
	}	

	return {
		body: posts
	};
}