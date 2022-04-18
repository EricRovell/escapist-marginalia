import { dev } from "$app/env";
import { getPosts } from "@core/getPosts";
import { find } from "@utils/query";
import type { Blogpost } from "@types";
import type { QueryOption } from "@utils/query";

type Query<T> = {
	"lang": QueryOption<string, T>;
}

export async function get({ url }) {
	const data: Blogpost[] = await getPosts();

	const query: Query<Blogpost> = {
		"lang": {
			value: url.searchParams.get("lang"),
			validator: value => [ "en", "ru"].includes(value),
			matcher: value => item => item.lang === value
		}
	};

	const articles = find(data, query);

	return {
		// render all posts during development
		body: articles.filter(post => dev || post.published)
	};
}