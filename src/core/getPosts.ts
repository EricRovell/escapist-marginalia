import { basename } from "path";
import type { Blogpost } from "../types";

export async function getPosts(): Promise<Blogpost[]> {
	const posts: Blogpost[] = [];

	// Import all .svx files in the directory
	const modules = import.meta.glob("/src/routes/content/**/*.svx");

	for await (const [ filename, module ] of Object.entries(modules)) {
		const { metadata } = await module();
		const { title, created, series } = metadata;

		posts.push({
			title,
			date: new Date(created as Date),
			series,
			slug: basename(filename, ".svx")
		});
	}

	return posts;
}