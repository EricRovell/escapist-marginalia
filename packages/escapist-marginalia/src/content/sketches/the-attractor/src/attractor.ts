import { randBool, randFloat, randInt } from "utils/random";

export function makeAttractor(width: number, height: number) {
	return {
		direction: randBool() ? 1 : -1,
		expAngularVelocityCoef: 10000 * randFloat(0.8, 1.2),
		expAngularVelocityMultCoef: 0.01 * randFloat(0.8, 1.2),
		radialVelocityCoef: 0.001 * randFloat(0.7, 1.3),
		radius: randFloat(50, 150) + randFloat(-50, 50),
		x: randFloat(0.35 * width, 0.75 * width),
		y: randFloat(0.35 * height, 0.75 * height)
	};
};

export function makeParticle(width: number, height: number, lifetime: number) {
	return {
		lifetime: randFloat(lifetime * 0.8, lifetime * 1.2),
		lightness: randInt(30, 80),
		saturation: randInt(50, 100),
		x: randFloat(-100, width + 100),
		y: randFloat(-100, height + 100)
	};
}
