import { basename } from "path";
import type { Blogpost } from "../types";

export async function getPosts(): Promise<Blogpost[]> {
	const posts: Blogpost[] = [];

	// Import all .svx files in the directory
	const modules = import.meta.glob("/src/content/**/*.svx");

	for await (const [ filename, module ] of Object.entries(modules)) {
		const { metadata } = await module();
		const { title, created, series, lang } = metadata;

		posts.push({
			title,
			lang,
			date: new Date(created as Date),
			series,
			slug: basename(filename, ".svx")
		});
	}

	return posts;
}