import { LANG } from "~/consts";

export const tEn = {
	DESCRIPTION: "List of published articles, notes, and problem solving.",
	KEYWORDS: "blog, web development, photography, portfolio",
	SUBJECT: "personal blog",
	TITLE: "Writing"
} as const;

export const tRu = {
	DESCRIPTION: "Образовательные статьи на различные темы, заметки и разбор интересных мне задач.",
	KEYWORDS: "блог, веб разработка, фотография",
	SUBJECT:"личный блог",
	TITLE: "Маргиналии"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
