import { LANG } from "~/consts";

export const tEn = {
	DESCRIPTION: "Generative art sketch and various visualizations using Canvas API and SVG.",
	KEYWORDS: "generative art, sketch, experiments",
	SUBJECT: "generative-art",
	TITLE: "Sketch"
} as const;

export const tRu = {
	DESCRIPTION: "Различного рода визуализации и зарисовки с использованием Canvas API и SVG.",
	KEYWORDS: "генеративное искусство, скетчи, визуализации",
	SUBJECT: "генеративное искусство",
	TITLE: "Визуализации"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
