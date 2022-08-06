import { getGalleryItem } from "@data/photos";

export function GET({ params }) {
	const { id } = params;
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const item = getGalleryItem(id);

	return {
		body: {
			image: item
		}
	};
}
