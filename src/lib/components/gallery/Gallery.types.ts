export interface Size {
	width: number;
	height: number;
}

export interface GalleryItem extends Size {
	id: number;
	path: string;
	format: string;
	alt: string;
	title: string;
}

export type GetSrc = (item: GalleryItem) => string;