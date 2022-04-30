import { fetchJSON } from "@utils/helpers";
import data from "./projects.json";
import type { Project, ProjectData, GithubAPIRepo } from "../types";

async function fetchProjectData({ repository, ...rest }: ProjectData): Promise<Project> {
	const {
		name,
		description,
		homepage,
		html_url: github,
		language,
		topics
	} = await fetchJSON<GithubAPIRepo>(`https://api.github.com/repos/${repository}`);

	return {
		...rest,
		repository,
		title: name,
		description,
		homepage,
		github,
		language,
		topics
	};
}

export async function getProjects(): Promise<Project[]> {
	const items = data as ProjectData[];
	const ps = items.map(project => fetchProjectData(project));
	return await Promise.all(ps);
}