import { dev } from "$app/env";
import { getBlogposts } from "@data/posts";
import type { Blogpost } from "@types";

export async function GET({ url }) {
	const published = !dev
		? { published: true }
		: {};

	const data: Blogpost[] = await getBlogposts({
		lang: url.searchParams.get("lang"),
		...published
	});

	return {
		body: data
	};
}