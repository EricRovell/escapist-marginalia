import { getProjects } from "@data/projects";

export async function get() {
	const projects = await getProjects();

	return {
		body: projects
	};
}