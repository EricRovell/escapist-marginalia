import { error } from "@sveltejs/kit";
import type { Blogpost } from "@types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch("/api/blogposts");
	const items: Blogpost[] = await res.json();

	if (res.ok) {
		return {
			items
		};
	}

	throw error(404, "Not found");
};
