import { dev } from "$app/env";
import { getBlogposts } from "@data/posts";
import type { RequestHandler } from "$types";
import type { Blogpost } from "@types";

export const GET: RequestHandler = async ({ url }) => {
	const published = !dev
		? { published: true }
		: {};

	const data: Blogpost[] = await getBlogposts({
		lang: url.searchParams.get("lang"),
		...published
	});

	return new Response(
		JSON.stringify(data)
	);
};
