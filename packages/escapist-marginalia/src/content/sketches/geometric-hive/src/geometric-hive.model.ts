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
