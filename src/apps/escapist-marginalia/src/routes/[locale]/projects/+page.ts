import { error } from "@sveltejs/kit";
import type { Project } from "@types";
import type { PageLoad } from "./$types";
	
export const load: PageLoad = async ({ fetch }) => {
	try {
		const res = await fetch("/api/projects");
		const items: Project[] = await res.json();
		return {
			items
		};
	} catch (err) {
		throw error(404, `Could not load: ${err.message}`);
	}
};
