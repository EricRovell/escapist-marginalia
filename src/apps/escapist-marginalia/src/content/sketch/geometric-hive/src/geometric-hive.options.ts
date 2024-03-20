import type { ColorStringHSL } from "types";

export interface Options {
	"background": ColorStringHSL;
	"gap-frequency": number;
	"particle-gap": number;
	"particle-size": number;
	"particle-speed-base": number;
}

export const DEFAULT_OPTIONS: Options = {
	"background": "hsl(242deg 5% 5% / 0.15)",
	"gap-frequency": 0.97,
	"particle-gap": 2,
	"particle-size": 24,
	"particle-speed-base": 0.12
};

export const IMMUTABLE_OPTIONS: Set<keyof Options> = new Set([
	"gap-frequency",
	"particle-gap",
	"particle-size",
	"particle-speed-base"
]);
