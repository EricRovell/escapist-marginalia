import { LANG } from "~/consts";

export const tEn = {
	DESCRIPTION: "About this website and it's purpose.",
	KEYWORDS: "blog, web development, photography, portfolio",
	SUBJECT: "personal website",
	TITLE: "About"
} as const;

export const tRu = {
	DESCRIPTION: "Немного об этом сайте, что, зачем и почему?",
	KEYWORDS: "блог, веб разработка, фотография, портфолио",
	SUBJECT: "личный вебсайт",
	TITLE: "О сайте"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
