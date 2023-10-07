import { error } from "@sveltejs/kit";
import { getProjects } from "@data/projects";
import type { PageLoad } from "./$types";
import type { Locale, Page } from "@types";

export const load: PageLoad = async ({ params }) => {
	try {
		const { locale = "en", slug } = params;

		const project = await getProjects({
			lang: locale as Locale,
			title: slug
		}, { limit: 1 });

		if (!project.length) {
			throw error(404, "There is no such a project.");
		}

		const filepathName = `${project[0].title}/index.${locale}`;

		let page: Page<typeof project[number]>;
		const modules = import.meta.glob("/src/content/project/**/*.svx");

		for (const [ filepath, module ] of Object.entries(modules)) {
			if (filepath.includes(filepathName)) {
				page = await module() as typeof page;
				break;
			}
		}

		return {
			page: page.default,
			metadata: page.metadata
		};

	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
