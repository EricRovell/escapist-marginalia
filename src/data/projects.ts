import { find } from "@utils/query";
import { fetchJSON } from "@utils/helpers";
import type { QueryItem } from "@utils/query";
import type { Project, ProjectPageData, GithubAPIRepo, Page } from "../types";

interface Options {
	limit?: number;
}

/**
 * There are 3 sources of project data:
 * 
 * 	1. The locale specific data stored in mdx pages;
 * 	2. The data from Github API;
 * 
 * I have to use 2 sources as I have to translate some data and cannot store
 * everything locally or via Github.
 */

/**
 * Retrieves data stored in project pages.
 */
const getProjectPageData = async () => {
	try {
		const projects: ProjectPageData[] = [];
		const modules = import.meta.glob("/src/content/project/*/*.svx");

		// the key is filename, we do not need it here
		for await (const [ , module ] of Object.entries(modules)) {
			const { metadata } = await module() as Page<ProjectPageData>;
			projects.push(metadata);
		}

		return projects;

	} catch (error) {
		console.error(`Cannot retrieve project data from pages: ${error.message}`);
	}
};

const getProjectGithubData = async (items: ProjectPageData[] = []) => {
	const projects: Project[] = [];

	try {
		for await (const project of items) {
			const data = await fetchJSON<GithubAPIRepo>(`https://api.github.com/repos/${project.repository}`);
			const { homepage, html_url: github, language, topics } = data;

			projects.push({
				...project,
				homepage,
				github,
				language,
				topics,
			});
		}

		return projects;

	} catch (error) {
		console.error(`Cannot retrieve project data from Github: ${error.message}`);
	}
};

export const getProjects = async ({ name, featured }: Partial<Project> = {}, { limit }: Options = {}): Promise<Project[]> => {
	const pageData = await getProjectPageData();
	const projects = await getProjectGithubData(pageData);

	type Query<T> = {
		"slug": QueryItem<string, T>;
		"featured": QueryItem<boolean, T>;
	};

	const query: Query<Project> = {
		slug: {
			value: name,
			validator: name => typeof name === "string",
			matcher: name => project => project.name === name
		},
		featured: {
			value: featured,
			validator: featured => typeof featured === "boolean",
			matcher: value => project => project.featured === value
		}
	};

	return find(projects, query, { limit });
};
