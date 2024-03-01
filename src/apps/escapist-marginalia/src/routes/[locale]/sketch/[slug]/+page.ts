import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
	try {
		const { locale = "en", slug } = params;

		let page = null;
		let sketch = null;
		let translation = null;

		const modules = import.meta.glob([
			"/src/content/sketch/**/*.svx",
			"/src/content/sketch/**/*.sketch.svelte",
			"/src/content/sketch/**/translation/*.json"
		]);

		for (const [ filepathName, module ] of Object.entries(modules)) {
			if (filepathName.includes(`${slug}/index.${locale}`)) {
				page = await module();
			}

			if (filepathName.includes(`${slug}.sketch`)) {
				sketch = await module();
			}

			if (filepathName.includes(`${slug}/translation/${locale}.json`)) {
				translation = await module();
			}
		}

		return {
			sketch: sketch.default,
			translation,
			page: page.default,
			metadata: page.metadata
		};

	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
