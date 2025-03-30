const tEn = {
	ABOUT: "About",
	GALLERY: "Gallery",
	HOME: "Home",
	PROJECTS: "Projects",
	SKETCH: "Sketch",
	WRITING: "Writing"
} as const;

const tRu = {
	ABOUT: "О себе",
	GALLERY: "Галерея",
	HOME: "Главная",
	PROJECTS: "Проекты",
	SKETCH: "Визуализации",
	WRITING: "Блог"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = import.meta.env.LANG === "en" ? tEn : tRu;
