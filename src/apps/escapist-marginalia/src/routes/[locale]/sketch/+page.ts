import { error } from "@sveltejs/kit";
import type { Page, Sketch } from "@types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	try {
		const { locale = "en" } = params;
		const sketches = [];

		const modules = import.meta.glob("/src/content/sketch/**/*.mdx");

		for (const [ , module ] of Object.entries(modules)) {
			const { metadata } = await module() as Page<Sketch>;
			if (metadata.lang === locale) {
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
