import { find, type QueryItem } from "@utils/query";
import type { Project, Page } from "../types";

interface Options {
	limit?: number;
}

/**
 * Retrieves data stored in project pages.
 */
const getProjectPageData = async () => {
	try {
		const projects: Project[] = [];
		const modules = import.meta.glob("/src/content/project/*/*.svx");

		// the key is filename, we do not need it here
		for await (const [ , module ] of Object.entries(modules)) {
			const { metadata } = await module() as Page<Project>;
			projects.push(metadata);
		}

		return projects;

	} catch (error) {
		console.error(`Cannot retrieve project data from pages: ${error.message}`);
	}
};

export const getProjects = async ({ lang, name, featured }: Partial<Project> = {}, { limit }: Options = {}): Promise<Project[]> => {
	const data = await getProjectPageData();

	type Query<T> = {
		"featured": QueryItem<boolean, T>;
		"lang": QueryItem<string, T>;
		"slug": QueryItem<string, T>;
	};

	const query: Query<Project> = {
		featured: {
			value: featured,
			validator: featured => typeof featured === "boolean",
			matcher: value => project => project.featured === value
		},
		lang: {
			value: lang,
			validator: lang => [ "en", "ru" ].includes(lang),
			matcher: value => project => project.lang === value
		},
		slug: {
			value: name,
			validator: name => typeof name === "string",
			matcher: name => project => project.name === name
		}
	};

	return find(data, query, { limit });
};
