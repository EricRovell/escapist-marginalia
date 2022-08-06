import { getGalleryItems } from "@data/photos";

export function GET({ url }: { url: URL }) {
	let limit = Number(url.searchParams.get("limit"));
	limit = (!Number.isNaN(limit) && limit > 0) ? limit : 50;
	const data = getGalleryItems(limit);

	return {
		body: {
			items: data
		}
	};
}