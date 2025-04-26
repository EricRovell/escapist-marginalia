import { LANG } from "~/consts";

export const tEn = {
	BACKGROUND: "Background color",
	FIELD: "Field",
	GAP_FREQUENCY: "Frequency",
	GAPS: "Gaps",
	PARTICLE_GAP: "Gap size",
	PARTICLE_SIZE: "Size",
	PARTICLE_SPEED_BASE: "Base speed",
	PARTICLES: "Particles"
} as const;

export const tRu = {
	BACKGROUND: "Цвет фона",
	FIELD: "Поле",
	GAP_FREQUENCY: "Частота",
	GAPS: "Пустоты",
	PARTICLE_GAP: "Интервал",
	PARTICLE_SIZE: "Размер",
	PARTICLE_SPEED_BASE: "Пороговая скорость",
	PARTICLES: "Частицы"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
