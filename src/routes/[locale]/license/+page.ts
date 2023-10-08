import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	try {
		const { locale = "en" } = params;

		let page = null;

		const modules = import.meta.glob("/src/content/pages/licence/*.svx");

		for (const [ filepathName, module ] of Object.entries(modules)) {
			if (filepathName.includes(`index.${locale}.svx`)) {
				page = await module();
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
