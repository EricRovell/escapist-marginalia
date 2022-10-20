import { error } from "@sveltejs/kit";
import { getBlogposts } from "@data/posts";
import type { RequestHandler } from "./$types";
import type { Blogpost } from "@types";

export const GET: RequestHandler = async ({ params }) => {
	const slug: string = params.slug;

	if (!slug) {
		throw error(404, "Not found am items with specified slug.");
	}

	const data: Blogpost[] = await getBlogposts({
		slug: decodeURI(slug),
		draft: false
	}, { limit: 1 });

	return new Response(
		JSON.stringify(data[0])
	);
};
