import { dev } from "$app/environment";
import { error } from "@sveltejs/kit";
import type { GalleryItem } from "ui";

import { getGalleryItems } from "@data/gallery";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
	const slug: string = params.slug;

	if (!slug) {
		throw error(404, "Not found am items with specified slug.");
	}

	// expose drafts only in dev
	const type = dev
		? {}
		: { draft: false };

	const data: GalleryItem[] = await getGalleryItems({
		slug: decodeURI(slug),
		...type
	}, { limit: 1 });

	return new Response(
		JSON.stringify(data[0])
	);
};
