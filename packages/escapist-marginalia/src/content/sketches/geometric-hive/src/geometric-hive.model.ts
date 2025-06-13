import { createModelContext } from "sketch";

import type { ColorStringHSL } from "ui/types";

export interface Model {
	background: ColorStringHSL;
	gap_frequency: number;
	particle_gap: number;
	particle_size: number;
	particle_speed_base: number;
}

export const DEFAULT_MODEL: Model = {
	background: "hsl(242deg 5% 5% / 15%)",
	gap_frequency: 0.97,
	particle_gap: 2,
	particle_size: 24,
	particle_speed_base: 0.12
};

export const { ModelProvider, useModel } = createModelContext(DEFAULT_MODEL);

export const MODEL_RESTRICTIONS = {
	gap_frequency: {
		max: 0.97,
		min: 0.8,
		step: 0.01
	},
	particle_gap: {
		max: 4,
		min: 1,
		step: 0.01
	},
	particle_size: {
		max: 40,
		min: 5,
		step: 1
	},
	particle_speed_base: {
		max: 0.3,
		min: 0.05,
		step: 0.01
	}
} as const;
