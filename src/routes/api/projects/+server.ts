import { getProjects } from "@data/projects";
import type { RequestHandler } from "$types";

export const GET: RequestHandler = async () => {
	const data = await getProjects();

	return new Response(
		JSON.stringify(data)
	);
};
