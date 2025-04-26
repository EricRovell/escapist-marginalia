import { LANG } from "~/consts";

export const tEn = {
	DESCRIPTION: "A photo collection I have done some time ago.",
	KEYWORDS: "gallery, photography, portfolio",
	SUBJECT: "photo gallery",
	TITLE: "Photo Gallery"
} as const;

export const tRu = {
	DESCRIPTION: "Фотогалерея некоторых моих работ.",
	KEYWORDS: "галерея, фотография, портфолио",
	SUBJECT: "галерея",
	TITLE: "Галерея"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
