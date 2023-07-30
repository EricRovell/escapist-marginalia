export interface Size {
	width: number;
	height: number;
}

export interface GalleryItem {
	camera: string;
	fnumber: number;
	date: Date;
	description: string;
	dominant: {
		r: number;
		g: number;
		b: number;
	};
	draft: boolean;
	focalLength: number;
	fullsize: {
		srcJpeg: string;
		srcWebp: string;
		width: number;
		height: number;
	};
	id: string;
	iso: string;
	keywords: string[];
	lang: string;
	lens: string;
	og: {
		src: string;
		width: number;
		height: number;
	};
	thumbnail: {
		src: string;
		width: number;
		height: number;
	};
	thumbnailSquare: {
		src: string;
		width: number;
		height: number;
	};
	title: string;
	shutter: string;
	slug: string;
	updated: Date;
}

export type GetSrc = (item: GalleryItem) => string;
