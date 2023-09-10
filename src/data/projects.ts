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
			const { draft = false } = metadata;
			projects.push({ ...metadata, draft });
		}

		return projects;

	} catch (error) {
		console.error(`Cannot retrieve project data from pages: ${error.message}`);
	}
};

export const getProjects = async ({ lang, title, featured, draft }: Partial<Project> = {}, { limit }: Options = {}): Promise<Project[]> => {
	const data = await getProjectPageData();

	type Query<T> = {
		"featured": QueryItem<boolean, T>;
		"draft": QueryItem<boolean, T>;
		"lang": QueryItem<string, T>;
		"slug": QueryItem<string, T>;
	};

	const query: Query<Project> = {
		draft: {
			value: draft,
			validator: draft => typeof draft === "boolean",
			matcher: value => project => project.draft === value
		},
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
			value: title,
			validator: title => typeof title === "string",
			matcher: title => project => project.title === title
		}
	};

	return find(data, query, { limit });
};
