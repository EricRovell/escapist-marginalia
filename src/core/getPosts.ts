import { basename } from "path";

interface Post {
	title: string;
	date: Date;
	slug: string;
	series: string;
}

export async function getPosts(): Promise<Post[]> {
	const posts: Post[] = [];

	// Import all .svx files in the directory
	const modules = import.meta.glob("/src/routes/content/**/*.svx");

	for await (const [ filename, module ] of Object.entries(modules)) {
		const { metadata } = await module();
		const { title, created, series } = metadata;

		posts.push({
			title,
			date: new Date(created),
			series,
			slug: basename(filename, ".svx")
		});
	}

	return posts;
}