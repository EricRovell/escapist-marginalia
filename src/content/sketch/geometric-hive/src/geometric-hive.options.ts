import type { ColorString } from "$lib/components/input-color/input-color.types";

export interface Options {
	"background": ColorString;
	"gap-frequency": number;
	"particle-gap": number;
	"particle-size": number;
	"particle-speed-base": number;
}

export const options: Options = {
	"background": "hsl(242 5% 5% / 0.15)",
	"gap-frequency": 0.97,
	"particle-gap": 2,
	"particle-size": 24,
	"particle-speed-base": 0.12
};

export const optionsImmutable: Set<keyof Options> = new Set([
	"gap-frequency",
	"particle-gap",
	"particle-size",
	"particle-speed-base"
]);
