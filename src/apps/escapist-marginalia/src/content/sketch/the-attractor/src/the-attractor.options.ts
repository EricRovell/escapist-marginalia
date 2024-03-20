export interface Options {
	attractors: number;
	particles: number;
	lifetime: number;
}

export const DEFAULT_OPTIONS: Options = {
	attractors: 5,
	particles: 1500,
	lifetime: 1200
};

export const IMMUTABLE_OPTIONS: Set<keyof Options> = new Set([
	"attractors",
	"particles",
	"lifetime"
]);
