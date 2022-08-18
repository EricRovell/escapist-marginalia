import { getGalleryItems } from "@data/photos";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ url }) => {
	let limit = Number(url.searchParams.get("limit"));
	limit = (!Number.isNaN(limit) && limit > 0) ? limit : 50;
	const data = getGalleryItems(limit);
	return data;
};
