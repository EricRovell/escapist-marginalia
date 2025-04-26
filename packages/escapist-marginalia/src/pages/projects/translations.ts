import { LANG } from "~/consts";

export const tEn = {
	DESCRIPTION: "Portfolio of my web development projects and contributions.",
	KEYWORDS: "portfolio, web development, programming",
	SUBJECT: "web developer portfolio",
	TITLE: "Projects"
} as const;

export const tRu = {
	DESCRIPTION: "Портфолио личных проектов и вклад в сторонние проекты.",
	KEYWORDS: "портфолио, веб разработка, программирование",
	SUBJECT: "портфолио веб разработчика",
	TITLE: "Проекты"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
