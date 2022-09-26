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

/**
 * Additional project data interface.
 */
export interface ProjectData {
	featured?: boolean;
	name: string;
	npm?: string;
	repository: string;
	techstack: string[];
	type: "string";
	website?: string;
}

export interface Project extends ProjectData {
	description: string;
	github: string;
	homepage: string;
	language: string;
	topics: string[];
}

export type { GalleryItem } from "@components";
