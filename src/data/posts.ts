import { find } from "@utils/query";
import type { Blogpost, BlogpostMetadata, Locale, Page } from "../types";
import type { QueryItem } from "@utils/query";

async function fetchBlogposts(): Promise<Blogpost[]> {
	const posts: Blogpost[] = [];

	// Import all .svx files in the directory
	const modules = import.meta.glob("/src/content/blogpost/**/*.svx");

	for await (const [ filename, module ] of Object.entries(modules)) {
		const { metadata } = await module() as Page<BlogpostMetadata>;
		const {
			created,
			updated,
			title,
			...rest
		}: BlogpostMetadata = metadata;

		posts.push({
			created: new Date(created),
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

	return posts;
}

interface Options {
	limit?: number;
}

export async function getBlogposts({ slug, lang, keywords, published }: Partial<Blogpost> = {}, { limit }: Options = {}): Promise<Blogpost[]> {
	const blogposts = await fetchBlogposts();

	type Query<T> = {
		"slug": QueryItem<string, T>;
		"published": QueryItem<boolean, T>;
		"lang": QueryItem<Locale, T>;
		"keywords": QueryItem<string[], T>;
	};

	const query: Query<Blogpost> = {
		slug: {
			value: slug,
			validator: slug => typeof slug === "string",
			matcher: slug => blogpost => blogpost.slug === slug
		},
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
