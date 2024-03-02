import { QuadTree, Rectangle, Point, Circle } from "quadtree";
import { randInt } from "utils/random";

import { Boid } from "./boid";
import { options as optionsDefault, type Options } from "./flocking.options";
import type { Renderer } from "@components/canvas";
import type { Sketch } from "@components/sketch/sketch.types";

export const sketch: Sketch<Options> = (options = optionsDefault) => {
	const boids: Boid[] = [];

	const setup: Renderer = ({ width, height }) => {
		for (let i = 0; i < options.boids; i++) {
			boids.push(
				new Boid({
					x: randInt(100, width),
					y: randInt(100, height),
					scale: options.scale,
					separation: 1500
				})
			);
		}
	};

	const draw: Renderer = ({ context, width, height }) => {
		const boundary = new Rectangle(0, 0, width, height);
		const qtree = new QuadTree<Point<Boid>>(options.capacity, boundary);

		for (let i = 0; i < boids.length; i++) {
			qtree.insert(
				new Point(boids[i].position.x, boids[i].position.y, boids[i])
			);
		}

		if (options.qtree && options.showQTree) {
			qtree.render(context);
		}

		for (let i = 0; i < boids.length; i++) {
			if (options.qtree) {
				const range = new Circle(
					boids[i].position.x,
					boids[i].position.y,
					options.perception
				);
				const points = qtree.query(range);
				const neighbours: Boid[] = [];

				for (const point of points) {
					neighbours.push(point.data);
				}

				boids[i].handleBorders(width, height, options.bound);
				boids[i].applyBehaviours(neighbours, {
					align: options.align,
					cohesion: options.cohesion,
					perception: options.perception,
					separate: options.separate
				});
				boids[i].move();
				boids[i].render({ context, width, height }, options.showPerception, options.perception);
			} else {
				boids[i].handleBorders(width, height, options.bound);
				boids[i].applyBehaviours(boids, {
					align: options.align,
					cohesion: options.cohesion,
					perception: options.perception,
					separate: options.separate
				});
				boids[i].move();
				boids[i].render({ context, width, height });
			}
		}
	};

	return {
		draw,
		setup,
		update(newOptions: Options) {
			options = {
				...options,
				...newOptions
			};
		}
	};
};
