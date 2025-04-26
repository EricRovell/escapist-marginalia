import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

import { LANG } from "./consts";

const pattern = LANG === "en"
	? "**/index.en.mdx"
	: "**/index.ru.mdx";

const PAGE_SCHEMA = {
	date_created: z.coerce.date(),
	date_updated: z.coerce.date().optional(),
	description: z.string(),
	keywords: z.array(z.string()),
	lang: z.union([ z.literal("en"), z.literal("ru") ]),
	slug: z.string(),
	title: z.string()
};

const pages = defineCollection({
	loader: glob({
		base: "./src/content/pages",
		pattern
	}),
	schema: z.object({
		...PAGE_SCHEMA
	})
});

/* const writing = defineCollection({
	loader: glob({
		pattern,
		base: "./src/content/writing"
	}),
	schema: ({ image }) => z.object({
		cover_alt: z.string(),
		cover_src: image(),
		...PAGE_SCHEMA
	})
}); */

const projects = defineCollection({
	loader: glob({
		base: "./src/content/projects",
		pattern
	}),
	schema: ({ image }) => z.object({
		cover_alt: z.string(),
		cover_src: image(),
		featured: z.boolean().optional(),
		maintained: z.boolean().optional(),
		npm: z.string().optional(),
		repository: z.string().optional(),
		website: z.string().url().optional(),
		...PAGE_SCHEMA
	})
});

const sketches = defineCollection({
	loader: glob({
		base: "./src/content/sketches",
		pattern
	}),
	schema: ({ image }) => z.object({
		cover_alt: z.string(),
		cover_src: image(),
		...PAGE_SCHEMA
	})
});

const sketch = defineCollection({
	loader: glob({
		base: "./src/content/sketches",
		pattern: "**/sketch.mdx"
	}),
	schema: z.object({
		slug: z.string()
	})
});

export const collections = {
	pages,
	projects,
	sketch,
	sketches
};
