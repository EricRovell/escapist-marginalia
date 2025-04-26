import { LANG } from "~/consts";

export const tEn = {
	ATTRACTORS: "Attractors",
	COUNT: "Count",
	FIELD: "Field",
	LIFETIME: "Lifetime",
	PARTICLES: "Particles"
} as const;

export const tRu = {
	ATTRACTORS: "Аттракторы",
	COUNT: "Количество",
	FIELD: "Поле",
	LIFETIME: "Время жизни",
	PARTICLES: "Частицы"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
