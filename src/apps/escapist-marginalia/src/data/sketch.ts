import { find, type QueryItem } from "$lib/utils";
import type { Sketch, Page } from "../types";

interface Options {
	limit?: number;
}

/**
 * Retrieves data stored in project pages.
 */
const getSketchPageData = async () => {
	try {
		const pages: Sketch[] = [];
		const modules = import.meta.glob("/src/content/sketch/*/*.mdx");

		// the key is filename, we do not need it here
		for await (const [ , module ] of Object.entries(modules)) {
			const { metadata } = await module() as Page<Sketch>;
			const { draft = false } = metadata;
			pages.push({ ...metadata, draft });
		}

		return pages;

	} catch (error) {
		console.error(`Cannot retrieve data from pages: ${error.message}`);
	}
};

export const getSketches = async ({ lang, title, draft }: Partial<Sketch> = {}, { limit }: Options = {}): Promise<Sketch[]> => {
	const data = await getSketchPageData();

	type Query<T> = {
		"draft": QueryItem<boolean, T>;
		"lang": QueryItem<string, T>;
		"slug": QueryItem<string, T>;
	};

	const query: Query<Sketch> = {
		draft: {
			value: draft,
			validator: draft => typeof draft === "boolean",
			matcher: value => project => project.draft === value
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
