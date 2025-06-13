import { createModelContext } from "sketch";

import type { VerticeRestrictionRule } from "chaos-game";
import type { ColorStringHSL } from "ui/types";

export interface Model {
	point_scale: number;
	points_color: ColorStringHSL;
	points_color_wheel: boolean;
	points_limit: number;
	polygon_color: ColorStringHSL;
	polygon_line_width: number;
	polygon_origin_theta: number;
	polygon_scale: number;
	polygon_sides: number;
	polygon_visible: boolean;
	restrictions: VerticeRestrictionRule[];
	speed: number;
	step_coef: number;
	step_distance: number;
	step_factor: boolean;
}

export const DEFAULT_MODEL: Model = {
	point_scale: 1,
	points_color: "hsl(0deg 0% 98%)",
	points_color_wheel: true,
	points_limit: 5000,
	polygon_color: "hsl(0deg 100% 50% / 50%)",
	polygon_line_width: 2,
	polygon_origin_theta: 0,
	polygon_scale: 0.45,
	polygon_sides: 3,
	polygon_visible: true,
	restrictions: [],
	speed: 10,
	step_coef: 0.5,
	step_distance: 1,
	step_factor: true
};

export const { ModelProvider, useModel } = createModelContext(DEFAULT_MODEL);

export const MODEL_RESTRICTIONS = {
	point_scale: {
		max: 5,
		min: 0.1,
		step: 0.1
	},
	points_limit: {
		max: 500000,
		min: 10,
		step: 1
	},
	polygon_line_width: {
		max: 5,
		min: 0.5,
		step: 0.5
	},
	polygon_origin_theta: {
		max: 360,
		min: 0,
		step: 0.01
	},
	polygon_scale: {
		max: 2,
		min: 0.1,
		step: 0.01
	},
	polygon_sides: {
		max: 12,
		min: 3,
		step: 1
	},
	speed: {
		max: 150,
		min: 1,
		step: 1
	},
	step_coef: {
		max: 1.5,
		min: 0.01,
		step: 0.01
	},
	step_distance: {
		max: 1000,
		min: 0.1,
		step: 0.1
	}
} as const;
