import { dev } from "$app/environment";
import { getBlogposts } from "@data/posts";
import type { RequestHandler } from "@sveltejs/kit/types";
import type { Blogpost } from "@types";

export const GET: RequestHandler = async () => {
	const published = !dev
		? { published: true }
		: {};

	const data: Blogpost[] = await getBlogposts({
		...published
	});

	return new Response(
		JSON.stringify(data)
	);
};
