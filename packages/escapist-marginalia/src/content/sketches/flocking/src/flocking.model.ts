import { createModelContext } from "sketch";

import type { ColorStringHSL } from "ui/types";

export interface Model {
	align: number;
	boids: number;
	bound: boolean;
	capacity: number;
	cohesion: number;
	color: ColorStringHSL;
	perception: number;
	qtree: boolean;
	scale: number;
	separate: number;
	show_perception: boolean;
	show_qtree: boolean;
}

export const DEFAULT_MODEL: Model = {
	align: 1,
	boids: 125,
	bound: false,
	capacity: 4,
	cohesion: 1,
	color: "hsl(0deg 0% 100% / 5%)",
	perception: 50,
	qtree: true,
	scale: 3.5,
	separate: 1,
	show_perception: false,
	show_qtree: false
};

export const { ModelProvider, useModel } = createModelContext(DEFAULT_MODEL);
