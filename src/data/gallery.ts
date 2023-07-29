import { find } from "@utils/query";
import type { GalleryItem, Page } from "../types";
import type { QueryItem } from "@utils/query";

async function fetchGalleryItems(): Promise<GalleryItem[]> {
	const items: GalleryItem[] = [];

	// Import all .svx files in the directory
	const modules = import.meta.glob("/src/content/gallery/**/*.svx");

	for await (const [ filename, module ] of Object.entries(modules)) {
		const { metadata } = await module() as Page<GalleryItem>;
		const {
			date,
			draft = false,
			updated,
			title,
			...rest
		}: GalleryItem = metadata;

		items.push({
			date: new Date(date),
			draft,
			updated: new Date(updated),
			title,
			/**
			 * All blogpost contents are located as:
			 * /src/content/blogpost/{blogpost}/{file}.svx
			 * For vite to analize dynamic imports we strill all but `{blogpost}/{file}`
			 * And later we have to break it by "/" and put parts into the path.
			 * */
			filepath: filename.slice(22, -4),
			...rest
		});
	}

	return items;
}

interface Options {
	limit?: number;
}

export async function getGalleryItems({ lang, keywords, draft, slug }: Partial<GalleryItem> = {}, { limit }: Options = {}): Promise<GalleryItem[]> {
	const blogposts = await fetchGalleryItems();

	type Query<T> = {
		"slug": QueryItem<string, T>;
		"draft": QueryItem<boolean, T>;
		"lang": QueryItem<string, T>;
		"keywords": QueryItem<string[], T>;
	};

	const query: Query<GalleryItem> = {
		slug: {
			value: slug,
			validator: value => typeof value === "string",
			matcher: value => item => item.slug === value
		},
		draft: {
			value: draft,
			validator: value => typeof value === "boolean",
			matcher: value => item => item.draft === value
		},
		lang: {
			value: lang,
			validator: lang => [ "en", "ru" ].includes(lang),
			matcher: lang => item => item.lang === lang
		},
		keywords: {
			value: keywords,
			validator: value => Array.isArray(keywords) && value.length > 0,
			matcher: value => item => value.every(keyword => item.keywords.includes(keyword))
		}
	};

	const sortByDate = (a: GalleryItem, b: GalleryItem) => {
		return new Number(a.id) > new Number(b.id) ? -1 : 1;
	};

	return find(blogposts, query, { limit, sort: sortByDate });
}
