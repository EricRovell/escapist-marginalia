import type { Locale } from "types";

import { find, type QueryItem } from "$lib/utils";
import type { Blogpost, BlogpostMetadata, Page } from "../types";

async function fetchBlogposts(): Promise<Blogpost[]> {
	const posts: Blogpost[] = [];

	// Import all .svx files in the directory
	const modules = import.meta.glob("/src/content/blogpost/**/*.mdx");

	for await (const [ filename, module ] of Object.entries(modules)) {
		const { metadata } = await module() as Page<BlogpostMetadata>;
		const {
			draft = false,
			title,
			...rest
		}: BlogpostMetadata = metadata;

		const path = filename.split("/");

		posts.push({
			draft,
			title,
			/**
			 * The directory name where blogpost files are located.
			 * */
			dirname: path[4],
			filename: path[5],
			...rest
		});
	}

	return posts;
}

interface Options {
	limit?: number;
}

export async function getBlogposts({ slug, lang, keywords, draft }: Partial<Blogpost> = {}, { limit }: Options = {}): Promise<Blogpost[]> {
	const blogposts = await fetchBlogposts();

	type Query<T> = {
		"slug": QueryItem<string, T>;
		"draft": QueryItem<boolean, T>;
		"lang": QueryItem<Locale, T>;
		"keywords": QueryItem<string[], T>;
	};

	const query: Query<Blogpost> = {
		slug: {
			value: slug,
			validator: slug => typeof slug === "string",
			matcher: slug => blogpost => blogpost.slug === slug
		},
		draft: {
			value: draft,
			validator: value => typeof value === "boolean",
			matcher: value => blogpost => blogpost.draft === value
		},
		lang: {
			value: lang,
			validator: lang => [ "en", "ru" ].includes(lang),
			matcher: lang => blogpost => blogpost.lang === lang
		},
		keywords: {
			value: keywords,
			validator: value => Array.isArray(keywords) && value.length > 0,
			matcher: value => blogpost => value.every(keyword => blogpost.keywords.includes(keyword))
		}
	};

	const sortByDate = (a: Blogpost, b: Blogpost) => {
		return new Date(a.dateCreated) > new Date(b.dateCreated)
			? -1
			: 1;
	};

	return find(blogposts, query, { limit, sort: sortByDate });
}
