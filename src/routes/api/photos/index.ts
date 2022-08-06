import type { GalleryItem } from "@components/gallery";

export async function GET({ url }: { url: URL }) {
	const { default: data }: { default: GalleryItem[] } = await import("@data/gallery.json");
	const limit = Number(url.searchParams.get("limit"));

	return Number.isNaN(limit) || limit <= 0
		? { body: data }
		: { body: data.slice(0, limit) };
}