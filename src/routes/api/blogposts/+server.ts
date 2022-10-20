import { dev, prerendering } from "$app/environment";
import { getBlogposts } from "@data/posts";
import type { RequestHandler } from "@sveltejs/kit/types";
import type { Blogpost } from "@types";

export const GET: RequestHandler = async () => {
	const status = !dev || prerendering
		? { draft: false }
		: {};

	const data: Blogpost[] = await getBlogposts(status);

	return new Response(
		JSON.stringify(data)
	);
};
