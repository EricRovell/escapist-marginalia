import { dev } from "$app/environment";
import { getBlogposts } from "@data/posts";
import type { RequestHandler } from "@sveltejs/kit/types";
import type { Blogpost, Locale } from "@types";

export const GET: RequestHandler = async ({ params }) => {
	const { locale = "en" } = params;

	const published = !dev
		? { published: true }
		: {};

	const data: Blogpost[] = await getBlogposts({
		lang: locale as Locale,
		...published
	});

	return new Response(
		JSON.stringify(data)
	);
};
