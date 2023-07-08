import { getGalleryItems } from "@data/gallery";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
	const { locale = "en" } = params;

	return {
		items: getGalleryItems({ lang: locale })
	};
};
