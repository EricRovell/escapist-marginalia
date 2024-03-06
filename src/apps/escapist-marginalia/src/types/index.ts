import type { SvelteComponent } from "svelte";
import type { Locale } from "types";

export type Variant = "neutral" | "primary" | "success" | "danger" | "warning" | "info" | "link" | "";

/**
 * The MDSvex page interface.
 */
export interface Page<T> {
	metadata: T;
	default: SvelteComponent;
}

export interface GalleryImage {
	height: number;
	src: string;
	width: number;
}

export interface CoverImage extends GalleryImage {
	alt: string;
}

/**
 * Describes the metadata object from the blogpost's frontmatter.
 */
export interface BlogpostMetadata {
	cover: CoverImage;
	dateCreated: string;
	dateUpdated: string;
	description: string;
	draft?: boolean;
	dirname: string;
	filename: string;
	keywords: string[];
	lang: Locale;
	layout?: string;
	published?: boolean;
	series: string;
	slug: string;
	title: string;
	translation: {
		locale: Locale;
		slug: string;
	};
	toc: {
		id: string;
		level: number;
		title: string;
	}[];
}

/**
 * Describes the blogpost's metadata.
 */
export interface Blogpost extends Omit<BlogpostMetadata, "dateCreated" | "dateUpdated" | "keywords"> {
	dateCreated: string;
	dateUpdated: string;
	keywords: string[];
	slug: string;
}

/**
 * Project Page Frontmatter data interface.
 */
export interface Project {
	cover: CoverImage;
	dateUpdated: string;
	description: string;
	draft?: boolean;
	featured?: boolean;
	keywords: string[];
	lang: Locale;
	layout: string | false;
	maintained: boolean;
	npm?: string;
	repository: string;
	slug: string;
	title: string;
	website?: string;
}

export interface Sketch {
	cover: CoverImage;
	dateUpdated: string;
	description: string;
	draft?: boolean;
	keywords: string[];
	lang: string;
	title: string;
	url: string;
}

export interface Bookmark {
	category: string;
	description: string;
	title: string;
	topics: string[];
	url: string;
}

export interface GalleryItemPage {
	camera: string;
	dateCreated: string;
	dateTaken: string;
	dateUpdated?: string;
	description: string;
	dominant: [ r: number, g: number, b: number ];
	fnumber: number;
	focalLength: number;
	fullsize: GalleryImage;
	id: string;
	iso: number;
	keywords?: string[];
	lang: Locale;
	layout: "gallery";
	lens: string;
	og: GalleryImage;
	shutter: string;
	slug: string;
	thumbnail: GalleryImage;
	thumbnailSquare: GalleryImage;
	title: string;
}
