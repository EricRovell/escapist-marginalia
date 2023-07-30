import { dev, building } from "$app/environment";
import { getGalleryItems } from "@data/gallery";
import type { RequestHandler } from "@sveltejs/kit/types";
import type { GalleryItem } from "@types";

export const GET: RequestHandler = async () => {
	const status = !dev || building
		? { draft: false }
		: {};

	const data: GalleryItem[] = await getGalleryItems(status);

	return new Response(
		JSON.stringify(data)
	);
};
