import { fetchJSON } from "@utils/helpers";
import type { Project, GithubRepo } from "../types";

interface DisplayedProjects {
	[key: string]: {
		type: "package" | "app";
		packageName?: string;
	}
}

/**
 * List of projects to display in portfolio.
 * Contains information that is not provided by `Github`, like
 * the type of project is is (`package`, for example).
 */
const projects: DisplayedProjects = {
	"blossom": {
		type: "package",
		packageName: "@ericrovell/blossom"
	},
	"svelte-media-observer": {
		type: "package",
		packageName: "svelte-media-observer"
	},
	"rational": {
		type: "package",
		packageName: "@ericrovell/rational"
	},
	"radix": {
		type: "package",
		packageName: "@ericrovell/radix"
	},
	"numbers": {
		type: "app"
	}
};

/**
 * Fetches the repos from `Github Rest API` filter the projects to include in portfolio.
 */
export async function getProjects(): Promise<Project[]> {
	const repos = await fetchJSON<GithubRepo[]>("https://api.github.com/users/ericrovell/repos");
	return repos
		.filter(({ name }) => projects[name])
		.map<Project>((project: GithubRepo) => {
			const { name, description, homepage, html_url, language, topics } = project;
			return {
				...projects[name],
				description,
				homepage,
				github: html_url,
				language,
				title: name,
				topics
			};
		});
}