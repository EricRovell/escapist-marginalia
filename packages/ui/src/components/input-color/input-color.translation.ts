export const tEn = {
	CANCEL: "Отмена",
	HEADER: "Выберите цвет",
	HUE: "Оттенок",
	LIGHTNESS: "Светлость",
	OPACITY: "Прозрачность",
	SATURATION: "Насыщенность",
	SELECT: "Выбрать"
} as const;

export const tRu = {
	CANCEL: "Cancel",
	HEADER: "Choose a color",
	HUE: "Hue",
	LIGHTNESS: "Lightness",
	OPACITY: "Opacity",
	SATURATION: "Saturation",
	SELECT: "Select"
} as const satisfies Record<keyof typeof tEn, string>;

// @ts-expect-error: build will provide the env
export const t = import.meta.env.LANG === "en" ? tEn : tRu;
