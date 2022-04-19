import { getProjects } from "@core/getProjects";

export async function get({ url }: { url: URL }) {
	const projects = await getProjects();
	const limit = parseInt(url.searchParams.get("limit"));

	return Number.isNaN(limit)
		? { body: projects }
		: { body: projects.slice(0, limit) };
}