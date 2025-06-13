import { createModelContext } from "sketch";

export interface Model {
	attractors: number;
	lifetime: number;
	particles: number;
}

export const DEFAULT_MODEL: Model = {
	attractors: 5,
	lifetime: 1200,
	particles: 1500
};

export const { ModelProvider, useModel } = createModelContext(DEFAULT_MODEL);

export const MODEL_RESTRICTIONS = {
	attractors: {
		max: 15,
		min: 1,
		step: 1
	},
	lifetime: {
		max: 3000,
		min: 250,
		step: 1
	},
	particles: {
		max: 2500,
		min: 500,
		step: 1
	}
} as const;
