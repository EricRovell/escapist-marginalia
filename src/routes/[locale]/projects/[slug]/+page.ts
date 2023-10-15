import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Page, Project } from "@types";

export const load: PageLoad = async ({ params }) => {
	try {
		const { locale = "en", slug } = params;
		const filepathName = `/${slug}/index.${locale}`;
		const modules = import.meta.glob("/src/content/project/**/*.svx");
		let page: Page<Project>;

		for (const [ filepath, module ] of Object.entries(modules)) {
			if (filepath.includes(filepathName)) {
				page = await module() as typeof page;
				break;
			}
		}

		if (!page) {
			throw error(404, "There is no such a project.");
		}

		return {
			page: page.default,
			metadata: page.metadata
		};

	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
