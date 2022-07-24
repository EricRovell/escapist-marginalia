import { getProjects } from "@data/projects";

export async function GET() {
	const projects = await getProjects();

	return {
		body: projects
	};
}