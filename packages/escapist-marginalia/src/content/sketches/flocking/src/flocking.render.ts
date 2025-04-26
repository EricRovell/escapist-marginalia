import { Circle, Point, QuadTree, Rectangle } from "quadtree";
import { randInt } from "utils/random";

import type { CreateSketch, Renderer } from "ui";

import { Boid } from "./boid";
import { DEFAULT_OPTIONS, type Options } from "./flocking.options";

export const createSketch: CreateSketch = (options: Options = DEFAULT_OPTIONS) => {
	const boids: Boid[] = [];

	const setup: Renderer = ({ height, width }) => {
		for (let i = 0; i < options.boids; i++) {
			boids.push(
				new Boid({
					scale: options.scale,
					separation: 1500,
					x: randInt(100, width),
					y: randInt(100, height)
				})
			);
		}
	};

	const draw: Renderer = ({ context, height, width }) => {
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
					if (point.data) {
						neighbours.push(point.data);
					}
				}

				boids[i].handleBorders(width, height, options.bound);
				boids[i].applyBehaviors(neighbours, {
					align: options.align,
					cohesion: options.cohesion,
					perception: options.perception,
					separate: options.separate
				});
				boids[i].move();
				boids[i].render({ context, height, width }, options.showPerception, options.perception);
			} else {
				boids[i].handleBorders(width, height, options.bound);
				boids[i].applyBehaviors(boids, {
					align: options.align,
					cohesion: options.cohesion,
					perception: options.perception,
					separate: options.separate
				});
				boids[i].move();
				boids[i].render({ context, height, width });
			}
		}
	};

	return {
		draw,
		setup,
		update(newOptions?: Options) {
			options = {
				...options,
				...newOptions
			};
		}
	};
};
