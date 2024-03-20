import type { ColorStringHSL } from "types";

export interface Options {
	align: number;
	bound: boolean;
	capacity: number;
	cohesion: number;
	color: ColorStringHSL;
	boids: number;
	perception: number;
	scale: number;
	separate: number;
	showQTree: boolean;
	showPerception: boolean;
	qtree: boolean;
}

export const DEFAULT_OPTIONS: Options = {
	align: 1,
	bound: false,
	cohesion: 1,
	capacity: 4,
	color: "hsl(0deg 0% 100% / 0.05)",
	boids: 125,
	perception: 50,
	scale: 3.5,
	separate: 1,
	showQTree: false,
	showPerception: false,
	qtree: true
};

export const IMMUTABLE_OPTIONS: Set<keyof Options> = new Set([
	"boids",
	"scale"
]);
