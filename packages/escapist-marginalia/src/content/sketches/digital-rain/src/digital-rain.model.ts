import { createModelContext } from "sketch";

import type { ColorStringHSL } from "ui/types";

export type CharType = "digits" | "katakana" | "math" | "uppercase_letters";

export interface Model {
	background: ColorStringHSL;
	chars: CharType[];
	color: ColorStringHSL;
	depth: number;
	distributed: boolean;
	random_colors: boolean;
	scale: number;
}

export const DEFAULT_MODEL: Model = {
	background: "hsl(0deg 0% 0% / 10%)",
	chars: [ "digits", "katakana", "math", "uppercase_letters" ],
	color: "hsl(120deg 100% 50%)",
	depth: 0.25,
	distributed: true,
	random_colors: false,
	scale: 8
};

export const { ModelProvider, useModel } = createModelContext(DEFAULT_MODEL);

export const MODEL_RESTRICTIONS = {
	depth: {
		max: 1,
		min: 0.01,
		step: 0.01
	},
	scale: {
		max: 25,
		min: 1,
		step: 1
	}
} as const;
