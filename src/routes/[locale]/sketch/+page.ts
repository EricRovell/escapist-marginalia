import { error } from "@sveltejs/kit";
import type { Page, Sketch } from "@types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
	try {
		const sketches = [];

		const modules = import.meta.glob("/src/content/sketch/**/*.svx");

		for (const [ , module ] of Object.entries(modules)) {
			const { metadata } = await module() as Page<Sketch>;
			sketches.push(metadata);
		}

		return {
			items: sketches
		};

	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
