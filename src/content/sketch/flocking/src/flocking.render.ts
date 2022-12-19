import { Boid } from "./boid";
import { randInt } from "@utils/random";
import type { Renderer } from "@components/canvas";
import { QuadTree, Rectangle, Point } from "@utils/quad-tree";
import { options as optionsDefault, type Options } from "./flocking.options";

export const sketch = (options: Options = optionsDefault) => {
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
				const range = new Rectangle(boids[i].position.x, boids[i].position.y, options.perception, options.perception);
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
				boids[i].render({ context, width, height });
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
		setup
	};
};
