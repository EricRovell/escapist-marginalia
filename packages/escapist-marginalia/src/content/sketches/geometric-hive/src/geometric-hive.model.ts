import { createModelContext } from "sketch";

import type { ColorStringHSL } from "ui/types";

export interface Model {
	"background": ColorStringHSL;
	"gap-frequency": number;
	"particle-gap": number;
	"particle-size": number;
	"particle-speed-base": number;
}

export const DEFAULT_MODEL: Model = {
	"background": "hsl(242deg 5% 5% / 15%)",
	"gap-frequency": 0.97,
	"particle-gap": 2,
	"particle-size": 24,
	"particle-speed-base": 0.12
};

export const { ModelProvider, useModel } = createModelContext(DEFAULT_MODEL);
