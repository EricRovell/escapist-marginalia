import type { SvelteComponent } from "svelte";

export type Variant = "neutral" | "primary" | "success" | "danger" | "warning" | "info" | "link" | "";
export type Locale = "ru" | "en";

/**
 * The MDSvex page interface.
 */
export interface Page<T> {
	metadata: T;
	default: SvelteComponent;
}

/**
 * Describes the metadata object from the blogpost's frontmatter.
 */
export interface BlogpostMetadata {
	cover: string;
	dateCreated: string;
	dateUpdated: string;
	description: string;
	draft?: boolean;
	filepath: string;
	keywords: string[];
	lang: Locale;
	layout?: string;
	published?: boolean;
	series: string;
	slug: string;
	title: string;
	translation: {
		lang: Locale;
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
	dateCreated: Date;
	dateUpdated: Date;
	keywords: string[];
	slug: string;
}

/**
 * Project Page Frontmatter data interface.
 */
export interface Project {
	dateUpdated: string;
	description: string;
	draft?: boolean;
	featured?: boolean;
	lang: Locale;
	layout: string | false;
	maintained: boolean;
	npm?: string;
	repository: string;
	title: string;
	techstack: string[];
	type: "string";
	website?: string;
}

export type { GalleryItem } from "@components";

export interface Sketch {
	cover: string;
	dateUpdated: string;
	description: string;
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

/**
 * Input field value validator.
 */
export type Validator<T> = (value: T) => ({
	valid: boolean,
	message: string
});

interface GalleryImage {
	height: number;
	src: string;
	width: number;
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
	lang: "en" | "ru";
	layout: "gallery";
	lens: string;
	og: GalleryImage;
	shutter: string;
	slug: string;
	thumbnail: GalleryImage;
	thumbnailSquare: GalleryImage;
	title: string;
}
