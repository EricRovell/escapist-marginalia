import { getGalleryItem } from "@data/photos";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
	const id: string = params.id;
	const item = getGalleryItem(id);
	return item;
};
