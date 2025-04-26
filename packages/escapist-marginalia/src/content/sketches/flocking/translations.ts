import { LANG } from "~/consts";

export const tEn = {
	ALIGNMENT: "Alignment",
	APPEARANCE: "Appearance",
	BEHAVIOR: "Behavior",
	BOIDS: "Boids",
	BOUND: "Bound",
	COHESION: "Cohesion",
	PERCEPTION: "Perception",
	PERCEPTION_APPEARANCE: "Show perception",
	QTREE: "Quad Tree",
	QTREE_APPEARANCE: "Show Quad Tree",
	QTREE_OPTIMIZATION: "Quad Tree optimization",
	SCALE: "Scale",
	SEPARATION: "Separation"
} as const;

export const tRu = {
	ALIGNMENT: "Выравнивание курса",
	APPEARANCE: "Внешний вид",
	BEHAVIOR: "Поведение",
	BOIDS: "Существа",
	BOUND: "Границы",
	COHESION: "Группировка",
	PERCEPTION: "Чутьё",
	PERCEPTION_APPEARANCE: "Отображать чутьё",
	QTREE: "Quad Tree",
	QTREE_APPEARANCE: "Отображать Quad Tree",
	QTREE_OPTIMIZATION: "Quad Tree оптимизация",
	SCALE: "Размер",
	SEPARATION: "Отталкивание"
} as const satisfies Record<keyof typeof tEn, string>;

export const t = LANG === "en" ? tEn : tRu;
