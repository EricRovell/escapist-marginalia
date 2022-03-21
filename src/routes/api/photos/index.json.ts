import type { GalleryItem } from "@components/gallery";

export async function get() {
	const photos = await import("@data/photos.json");

	return {
		body: photos.default as GalleryItem[]
	};
}