import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { Blogpost } from "@types";

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const request = await fetch(`/api/blogpost/${encodeURI(params.slug)}`);
		const { dirname, filename, lang }: Blogpost = await request.json();

		let page = null;
		let translation = null;

		const modules = import.meta.glob([
			"/src/content/blogpost/**/*.mdx",
			"/src/content/blogpost/**/translations/*.ts"
		]);

		for (const [ filepathName, module ] of Object.entries(modules)) {
			if (filepathName.includes(`${dirname}/${filename}`)) {
				page = await module();
			}

			if (filepathName.includes(`${dirname}/translations/${lang}.ts`)) {
				translation = await module();
			}

			if (page && translation) {
				break;
			}
		}

		return {
			page: page?.default,
			translation: translation?.t,
			metadata: page?.metadata
		};
	} catch (err) {
		throw error(404, `Not found: ${err.message}`);
	}
};
