import { dev, building } from "$app/environment";
import { getProjects } from "@data/projects";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
	const status = !dev || building
		? { draft: false }
		: {};

	const data = await getProjects(status);

	return new Response(
		JSON.stringify(data)
	);
};
