import type { SvelteComponent } from "svelte";

export type Variant = "neutral" | "primary" | "success" | "danger" | "warning" | "info" | "link";
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
	created: string;
	description: string;
	draft?: boolean;
	filepath: string;
	keywords: string[];
	lang: Locale;
	layout?: string;
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
	updated: string;
}

/**
 * Describes the blogpost's metadata.
 */
export interface Blogpost extends Omit<BlogpostMetadata, "created" | "updated" | "keywords"> {
	created: Date;
	updated: Date;
	keywords: string[];
	slug: string;
}

/**
 * `Github Rest API` Project data interface.
 */
export interface GithubAPIRepo {
	name: string;
	description: string;
	homepage: string;
	html_url: string;
	language: string;
	topics: string[];
}

/**
 * Project Page Frontmatter data interface.
 */
export interface ProjectPageData {
	description: string;
	featured?: boolean;
	lang: Locale;
	layout: string | false;
	maintained: boolean;
	name: string;
	npm?: string;
	repository: string;
	techstack: string[];
	type: "string";
	updated: string;
	website?: string;
}

export interface Project extends ProjectPageData, Omit<GithubAPIRepo, "html_url"> {
	github: string;
}

export type { GalleryItem } from "@components";

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
