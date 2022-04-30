import data from "./photos.json";
import type { GalleryItem } from "../types";

export function getPhotos(): GalleryItem[] {
	const photos: GalleryItem[] = data;
	return photos;
}