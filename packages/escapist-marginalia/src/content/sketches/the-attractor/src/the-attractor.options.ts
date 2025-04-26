export interface Options {
	attractors: number;
	lifetime: number;
	particles: number;
}

export const DEFAULT_OPTIONS: Options = {
	attractors: 5,
	lifetime: 1200,
	particles: 1500
};

export const IMMUTABLE_OPTIONS = new Set<keyof Options>([
	"attractors",
	"particles",
	"lifetime"
]);
