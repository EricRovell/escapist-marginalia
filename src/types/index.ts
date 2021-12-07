export type Variant = "neutral" | "primary" | "success" | "danger" | "warning" | "info" | "link";

/**
 * Describes the metadata object from the blogpost's frontmatter.
 */
export interface BlogpostMetadata {
	title: string;
	description: string;
	series: string;
	created: string;
	updated: string;
	keywords: string;
	published?: boolean;
	layout?: string;
	slug: string;
	lang: "ru" | "en";
}

/**
 * Describes the blogpost's metadata.
 */
export interface Blogpost extends Omit<BlogpostMetadata, "created" | "updated" | "keywords"> {
	created: Date;
	updated: Date;
	keywords: string[];
}

/**
 * Defines a used `repo` object subset from `Github Rest API`
 */
export interface GithubRepo {
	name: string;
	description: string;
	homepage: string;
	html_url: string;
	language: string;
	topics: string[];
}

/**
 * Defines a Project data used to render the view.
 */
export interface Project extends Omit<GithubRepo, "html_url"> {
	type: "app" | "package" | "website";
	github: string;
	packageName?: string;
}

export type { GalleryItem } from "@components";