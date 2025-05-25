import { createModelContext } from "sketch";

import type { VerticeRestrictionRule } from "chaos-game";
import type { ColorStringHSL } from "ui/types";

export interface Model {
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

export const DEFAULT_MODEL: Model = {
	"point-scale": 1,
	"points-color": "hsl(0deg 0% 98%)",
	"points-color-wheel": true,
	"points-limit": 5000,
	"polygon-color": "hsl(0deg 100% 50% / 50%)",
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

export const { ModelProvider, useModel } = createModelContext(DEFAULT_MODEL);
