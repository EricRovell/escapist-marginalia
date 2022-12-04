import { Boid } from "./boid";
import { randInt } from "@utils/random";
import type { Renderer } from "@components/canvas";
import { options as optionsDefault, type Options } from "./flocking.options";

export const sketch = (options: Options = optionsDefault) => {
	const boids: Boid[] = [];

	const setup: Renderer = ({ width, height }) => {
		for (let i = 0; i < options.boids; i++) {
			boids.push(
				new Boid({
					x: randInt(100, width),
					y: randInt(100, height),
					scale: 5,
					mass: 1,
					speedLimit: 3.5,
					forceLimit: 0.05,
					separation: 300
				})
			);
		}

		console.log(boids.length);
	};

	const draw: Renderer = ({ context, width, height }) => {
		for (let i = 0; i < boids.length; i++) {
			boids[i].applyBehaviours(boids, {
				align: 1,
				cohesion: 1,
				separate: 1
			});
			boids[i].move();
			boids[i].render({ context, width, height });
		}
	};

	return {
		draw,
		setup
	};
};
