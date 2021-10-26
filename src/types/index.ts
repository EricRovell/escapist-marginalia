export type Variant = "neutral" | "primary" | "success" | "danger" | "warning" | "info" | "link";

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