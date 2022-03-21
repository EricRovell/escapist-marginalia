import type { GalleryItem } from "@components/gallery";

export async function get({ params }) {
	const photos = await import("@data/photos.json");
	const photo: GalleryItem = photos
		.default
		.filter(({ id }) => id === params.id)[0];

	return {
		body: photo
	};
}