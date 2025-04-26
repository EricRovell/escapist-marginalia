import type { VerticeRestrictionRule } from "chaos-game";

import type { ColorStringHSL } from "~/types";

export interface Options {
	"point-scale": number;
	"points-color": ColorStringHSL;
	"points-color-wheel": boolean;
	"points-limit": number;
	"polygon-color": ColorStringHSL;
	"polygon-line-width": number;
	"polygon-origin-theta": number;
	"polygon-scale": number;
	"polygon-sides": number;
	"polygon-visible": boolean;
	"restrictions": VerticeRestrictionRule[];
	"speed": number;
	"step-coef": number;
	"step-distance": number;
	"step-factor": boolean;
}

export const DEFAULT_OPTIONS: Options = {
	"point-scale": 1,
	"points-color": "hsl(0deg 0% 98% / 1)",
	"points-color-wheel": true,
	"points-limit": 5000,
	"polygon-color": "hsl(0deg 100% 50% / 0.5)",
	"polygon-line-width": 2,
	"polygon-origin-theta": 0,
	"polygon-scale": 0.45,
	"polygon-sides": 3,
	"polygon-visible": true,
	"restrictions": [],
	"speed": 10,
	"step-coef": 0.5,
	"step-distance": 1,
	"step-factor": true
};

export const IMMUTABLE_OPTIONS = new Set<keyof Options>([
	"points-color-wheel",
	"polygon-color",
	"polygon-line-width",
	"polygon-origin-theta",
	"polygon-scale",
	"polygon-sides",
	"polygon-visible",
	"restrictions",
	"step-coef",
	"step-distance",
	"step-factor"
]);
