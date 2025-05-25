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
