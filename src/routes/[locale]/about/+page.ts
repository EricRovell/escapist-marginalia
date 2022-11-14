import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	try {
		const { locale = "en" } = params;

		let page = null;

		const modules = import.meta.glob("/src/content/pages/about/*.svx");

		for (const [ filepathName, module ] of Object.entries(modules)) {
			if (filepathName.includes(`index.${locale}.svx`)) {
				page = await module();
			}
		}

		return {
			Page: page.default
		};

	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
