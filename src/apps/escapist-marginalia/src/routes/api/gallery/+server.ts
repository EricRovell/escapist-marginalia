import { dev, building } from "$app/environment";
import type { GalleryItem } from "ui";
import type { RequestHandler } from "@sveltejs/kit";

import { getGalleryItems } from "@data/gallery";

export const GET: RequestHandler = async () => {
	const status = !dev || building
		? { draft: false }
		: {};

	const data: GalleryItem[] = await getGalleryItems(status);

	return new Response(
		JSON.stringify(data)
	);
};
