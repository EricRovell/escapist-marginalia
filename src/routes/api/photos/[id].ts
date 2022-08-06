import type { GalleryItem } from "@components/gallery";

export async function GET({ params }) {
	const photos = await import("@data/gallery.json");
	const photo: GalleryItem = photos
		.default
		.filter(({ id }) => id === params.id)[0];

	return {
		body: photo
	};
}