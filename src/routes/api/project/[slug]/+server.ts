import { error } from "@sveltejs/kit";
import { getProjects } from "@data/projects";
import type { RequestHandler } from "./$types";
import type { Project } from "@types";

export const GET: RequestHandler = async ({ params }) => {
	const slug: string = params.slug;

	if (!slug) {
		throw error(404, "Not found am items with specified slug.");
	}

	const data: Project[] = await getProjects({
		name: decodeURI(slug)
	}, { limit: 1 });

	return new Response(
		JSON.stringify(data[0])
	);
};
