export type Variant = "neutral" | "primary" | "success" | "danger" | "warning" | "info" | "link";

export type Locale = "ru" | "en";

/**
 * Describes the metadata object from the blogpost's frontmatter.
 */
export interface BlogpostMetadata {
	created: string;
	description: string;
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
 * Defines a used `repo` object subset from `Github Rest API`
 */
export interface GithubAPIRepo {
	name: string;
	description: string;
	homepage: string;
	html_url: string;
	language: string;
	topics: string[];
}

export interface ProjectData {
	name: string;
	type: "library" | "app";
	repository: string;
	npm?: string;
	website?: string;
}

export interface Project {
	name: string;
	description: string;
	homepage: string;
	github: string;
	language: string;
	topics: string[];
	type: "library" | "app";
	repository: string;
	npm?: string;
	website?: string;
}

/**
 * Defines a Project data used to render the view.
 */
export interface Project extends Omit<GithubAPIRepo, "html_url"> {
	type: "app" | "package" | "website";
	github: string;
	npm?: string;
}

export type { GalleryItem } from "@components";
