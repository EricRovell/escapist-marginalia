export interface Size {
	width: number;
	height: number;
}

export interface GalleryItem extends Size {
	aperture: `f/${number}`;
	camera: string;
	date: string;
	description: string;
	dominant: [ number, number, number ];
	focalLength: `${number} mm`;
	id: string;
	iso: number;
	keywords: string[];
	lens: string;
	title: string;
	shutterSpeed: string;
	src: string;
	thumb: {
		width: number;
		height: number;
		src: string;
		cover: string;
	}
}

export type GetSrc = (item: GalleryItem) => string;
