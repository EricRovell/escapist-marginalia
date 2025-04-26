import type { ColorStringHSL } from "~/types";

export interface Options {
	align: number;
	boids: number;
	bound: boolean;
	capacity: number;
	cohesion: number;
	color: ColorStringHSL;
	perception: number;
	qtree: boolean;
	scale: number;
	separate: number;
	showPerception: boolean;
	showQTree: boolean;
}

export const DEFAULT_OPTIONS: Options = {
	align: 1,
	boids: 125,
	bound: false,
	capacity: 4,
	cohesion: 1,
	color: "hsl(0deg 0% 100% / 0.05)",
	perception: 50,
	qtree: true,
	scale: 3.5,
	separate: 1,
	showPerception: false,
	showQTree: false
};

export const IMMUTABLE_OPTIONS = new Set<keyof Options>([
	"boids",
	"scale"
]);
