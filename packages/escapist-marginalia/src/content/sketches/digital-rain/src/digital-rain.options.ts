import type { ColorStringHSL } from "~/types";

export interface Options {
	background: ColorStringHSL;
	chars: ("digits" | "katakana" | "math" | "uppercaseLetters")[];
	color: ColorStringHSL;
	depth: number;
	distributed: boolean;
	randomColors: boolean;
	scale: number;
}

export const DEFAULT_OPTIONS: Options = {
	background: "hsl(0deg 0% 0% / 0.1)",
	chars: [ "digits", "katakana", "math", "uppercaseLetters" ],
	color: "hsl(120deg 100% 50% / 1)",
	depth: 0.25,
	distributed: true,
	randomColors: false,
	scale: 10
};

export const IMMUTABLE_OPTIONS = new Set<keyof Options>([
	"background",
	"color",
	"depth",
	"scale"
]);
