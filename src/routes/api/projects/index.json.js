import { getProjects } from "@core/getProjects";

export async function get() {
	const projects = await getProjects();

	return {
		body: projects
	};
}