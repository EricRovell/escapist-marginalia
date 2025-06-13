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

export const MODEL_RESTRICTIONS = {
	align: {
		max: 2.5,
		min: 0.1,
		step: 0.01
	},
	boids: {
		max: 250,
		min: 10,
		step: 1
	},
	cohesion: {
		max: 2.5,
		min: 0.1,
		step: 0.01
	},
	perception: {
		max: 250,
		min: 50,
		step: 1
	},
	scale: {
		max: 5,
		min: 1,
		step: 0.1
	},
	separate: {
		max: 2.5,
		min: 0.1,
		step: 0.01
	}
} as const;
