import { basename, dirname } from "path";
import { find } from "@utils/query";
import type { Blogpost, BlogpostMetadata } from "../types";
import type { QueryItem } from "@utils/query";

async function fetchBlogposts(): Promise<Blogpost[]> {
	const posts: Blogpost[] = [];

	// Import all .svx files in the directory
	const modules = import.meta.glob("/src/content/**/*.svx");

	for await (const [ filename, module ] of Object.entries(modules)) {
		const { metadata } = await module();
		const { created, updated, keywords, lang, ...rest }: BlogpostMetadata = metadata;

		posts.push({
			created: new Date(created),
			updated: new Date(updated),
			keywords,
			slug: `${lang}-${basename(dirname(filename), ".svx")}`,
			lang,
			...rest
		});
	}

	return posts;
}

interface Options {
	limit?: number;
}

export async function getBlogposts({ lang, keywords, published }: Partial<Blogpost> = {}, { limit }: Options = {}): Promise<Blogpost[]> {
	const blogposts = await fetchBlogposts();

	type Query<T> = {
		"published": QueryItem<boolean, T>;
		"lang": QueryItem<"en" | "ru", T>;
		"keywords": QueryItem<string[], T>;
	};

	const query: Query<Blogpost> = {
		published: {
			value: published,
			validator: value => value,
			matcher: value => blogpost => blogpost.published === value
		},
		lang: {
			value: lang,
			validator: lang => [ "en", "ru" ].includes(lang),
			matcher: lang => blogpost => blogpost.lang === lang
		},
		keywords: {
			value: keywords,
			validator: value => value.length > 0,
			matcher: value => blogpost => value.every(keyword => blogpost.keywords.includes(keyword))
		}
	};

	const sortByDate = (a: Blogpost, b: Blogpost) => {
		return new Date(a.created) > new Date(b.created)
			? -1
			: 1;
	};

	return find(blogposts, query, { limit, sort: sortByDate });
}