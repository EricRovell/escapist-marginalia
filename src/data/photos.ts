import data from "./gallery.json";
import type { GalleryItem } from "../types";

type GetGalleryItems = (limit?: number) => GalleryItem[];
type GetGalleryItem = (id: string) => GalleryItem;

export const getGalleryItems: GetGalleryItems = (limit = 50) => {
	const items = data as GalleryItem[];
	return items.slice(0, limit);
};

export const getGalleryItem: GetGalleryItem = id => {
	return getGalleryItems()
		.filter(item => item.id === id)[0];
};
