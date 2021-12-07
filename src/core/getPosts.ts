import { basename } from "path";
import type { Blogpost, BlogpostMetadata } from "../types";

export async function getPosts(): Promise<Blogpost[]> {
	const posts: Blogpost[] = [];

	// Import all .svx files in the directory
	const modules = import.meta.glob("/src/content/**/*.svx");

	for await (const [ filename, module ] of Object.entries(modules)) {
		const { metadata } = await module();
		const { created, updated, keywords, ...rest }: BlogpostMetadata = metadata;

		posts.push({
			created: new Date(created),
			updated: new Date(updated),
			keywords: keywords.split(","),
			slug: basename(filename, ".svx"),
			...rest
		});
	}

	return posts;
}