import { LANG } from "~/consts";

export const tEn = {
	DESCRIPTION: "Some escapist's corner about math, programming, photography, and more...",
	KEYWORDS: "blog, math, web development, photography, portfolio",
	SUBJECT: "personal website",
	TITLE: "Escapist Marginalia"
} as const;

export const tRu = {
	DESCRIPTION: "Личный веб-уголок некоторого эскаписта, посвящённый математике, программированию, фотографии и обо всём ему интересном.",
	KEYWORDS: "блог, веб разработка, фотография, портфолио",
	SUBJECT: "личный вебсайт",
	TITLE: "Маргиналии Эскаписта"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
