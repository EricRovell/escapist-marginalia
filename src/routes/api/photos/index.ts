import type { GalleryItem } from "@components/gallery";

export async function get({ url }: { url: URL }) {
	const { default: data }: { default: GalleryItem[] } = await import("@data/photos.json");
	const limit = parseInt(url.searchParams.get("limit"));

	return Number.isNaN(limit)
		? { body: data }
		: { body: data.slice(0, limit) };
}