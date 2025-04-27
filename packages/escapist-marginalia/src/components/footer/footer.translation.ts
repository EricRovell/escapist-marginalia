import { LANG } from "~/consts";

const tEn = {
	ABOUT: "About",
	ANOTHER_LANG: "Веб-сайт на русском",
	BUILD: "Build",
	GALLERY: "Gallery",
	HOME: "Home",
	NO_AI: "This website does not contain AI-generated content.",
	PROJECTS: "Projects",
	SKETCH: "Sketch",
	WRITING: "Writing"
} as const;

const tRu = {
	ABOUT: "О себе",
	ANOTHER_LANG: "English website",
	BUILD: "Сборка",
	GALLERY: "Галерея",
	HOME: "Главная",
	NO_AI: "Веб-сайт не содержит контента, созданного с помощью искусственного интеллекта",
	PROJECTS: "Проекты",
	SKETCH: "Визуализации",
	WRITING: "Блог"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
