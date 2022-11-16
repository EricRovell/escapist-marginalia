import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	try {
		const { locale = "en" } = params;

		const sketches = [];

		const modules = import.meta.glob("/src/content/sketch/**/*.svx");

		for (const [ filepathName, module ] of Object.entries(modules)) {
			if (filepathName.includes(`index.${locale}`)) {
				const { metadata } = await module();
				sketches.push(metadata);
			}
		}

		return {
			items: sketches
		};

	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
