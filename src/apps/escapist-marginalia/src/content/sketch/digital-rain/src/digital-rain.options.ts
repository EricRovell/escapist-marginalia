import type { ColorStringHSL } from "types";

export interface Options {
	background: ColorStringHSL;
	chars: Array<"digits" | "katakana" | "math" | "uppercaseLetters">;
	color: ColorStringHSL;
	depth: number;
	distributed: boolean;
	randomColors: boolean;
	scale: number;
}

export const DEFAULT_OPTIONS: Options = {
	background: "hsl(0deg 0% 0% / 0.1)",
	color: "hsl(120deg 100% 50% / 1)",
	chars: [ "digits", "katakana", "math", "uppercaseLetters" ],
	depth: 0.25,
	distributed: true,
	randomColors: false,
	scale: 10
};

export const IMMUTABLE_OPTIONS: Set<keyof Options> = new Set([
	"scale",
	"background",
	"color",
	"depth"
]);
