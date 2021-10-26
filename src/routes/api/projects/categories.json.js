import { getProjects } from "@core/getProjects";

export async function get() {
	const projects = await getProjects();
	const categories = {};
	
	// break into categories
	projects.map(project => {
		const { type } = project;
		categories[type]
			? categories[type].push(project)
			: categories[type] = [ project ];
	});

	return {
		body: categories
	};
}