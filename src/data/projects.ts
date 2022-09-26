import { fetchJSON } from "@utils/helpers";
import data from "./projects.json";
import type { Project, ProjectData, GithubAPIRepo } from "../types";

async function fetchProjectData({ repository, ...rest }: ProjectData): Promise<Project> {
	try {
		const data = await fetchJSON<GithubAPIRepo>(`https://api.github.com/repos/${repository}`);

		const {
			name,
			description,
			homepage,
			html_url: github,
			language,
			topics,
		} = data;

		return {
			...rest,
			description,
			github,
			homepage,
			language,
			name,
			repository,
			topics
		};
	} catch (error) {
		console.error(error.message);
	}
}

export async function getProjects(): Promise<Project[]> {
	const items = data as ProjectData[];
	const ps = items.map(project => fetchProjectData(project));
	return await Promise.all(ps);
}
