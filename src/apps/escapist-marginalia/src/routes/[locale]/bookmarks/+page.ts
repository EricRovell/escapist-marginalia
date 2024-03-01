import data from "@lib/../content/bookmarks/index.json";
import type { Bookmark } from "@types";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
	return {
		items: data as Bookmark[]
	};
};
