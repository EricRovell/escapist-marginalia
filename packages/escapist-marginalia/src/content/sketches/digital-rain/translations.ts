import { LANG } from "~/consts";

export const tEn = {
	BACKGROUND: "Background",
	BEHAVIOR: "Behavior",
	COLOR: "Color",
	DEPTH: "Depth",
	DIGITS: "Digits",
	DISTRIBUTED: "Distributed",
	FADE: "fade",
	FONT_SIZE: "Font size",
	GENERAL: "General",
	KATAKANA: "Katakana",
	MATH: "Math symbols",
	RANDOM_COLORS: "Random Colors",
	SCALE: "Scale",
	SYMBOLS: "Symbols",
	UPPERCASE: "Uppercase Letters"
} as const;

export const tRu = {
	BACKGROUND: "Фон",
	BEHAVIOR: "Поведение",
	COLOR: "Цвет",
	DEPTH: "Глубина",
	DIGITS: "Цифры",
	DISTRIBUTED: "Распределённость",
	FADE: "Степень исчезновения",
	FONT_SIZE: "Масштаб",
	GENERAL: "Общее",
	KATAKANA: "Катакана",
	MATH: "Математические обозначения",
	RANDOM_COLORS: "Случайные цвета",
	SCALE: "Масштаб",
	SYMBOLS: "Символы",
	UPPERCASE: "Заглавные буквы"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
