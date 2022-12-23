export interface Options {
	attractors: number;
	particles: number;
	lifetime: number;
}

export const options: Options = {
	attractors: 5,
	particles: 1500,
	lifetime: 1200
};

export const optionsImmutable: Set<keyof Options> = new Set([
	"attractors",
	"particles",
	"lifetime"
]);
