export interface Options {
	align: number;
	bound: boolean;
	capacity: number;
	cohesion: number;
	color: string;
	boids: number;
	perception: number;
	scale: number;
	separate: number;
	showQTree: boolean;
	showPerception: boolean;
	qtree: boolean;
}

export const options: Options = {
	align: 1,
	bound: false,
	cohesion: 1,
	capacity: 4,
	color: "rgb(255 255 255 / 0.05)",
	boids: 125,
	perception: 50,
	scale: 3.5,
	separate: 1,
	showQTree: false,
	showPerception: false,
	qtree: true
};

export const optionsImmutable: Set<keyof Options> = new Set([
	"boids",
	"scale"
]);
