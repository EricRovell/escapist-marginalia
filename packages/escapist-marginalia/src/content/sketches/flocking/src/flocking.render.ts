import { Circle, Point, QuadTree, Rectangle } from "quadtree";
import { randInt } from "utils/random";

import type { Renderer, SketchConstructor } from "sketch";

import { Boid } from "./boid";
import { useModel } from "./flocking.model";

export const sketch: SketchConstructor = () => () => {
	const { model } = useModel();

	const boids: Boid[] = [];

	const setup: Renderer = ({ height, width }) => {
		for (let i = 0; i < model.boids; i++) {
			boids.push(
				new Boid({
					scale: model.scale,
					separation: 1500,
					x: randInt(100, width),
					y: randInt(100, height)
				})
			);
		}
	};

	const draw: Renderer = ({ context, height, width }) => {
		const boundary = new Rectangle(0, 0, width, height);
		const qtree = new QuadTree<Point<Boid>>(model.capacity, boundary);

		for (let i = 0; i < boids.length; i++) {
			qtree.insert(
				new Point(boids[i].position.x, boids[i].position.y, boids[i])
			);
		}

		if (model.qtree && model.showQTree) {
			qtree.render(context);
		}

		for (let i = 0; i < boids.length; i++) {
			if (model.qtree) {
				const range = new Circle(
					boids[i].position.x,
					boids[i].position.y,
					model.perception
				);
				const points = qtree.query(range);
				const neighbours: Boid[] = [];

				for (const point of points) {
					if (point.data) {
						neighbours.push(point.data);
					}
				}

				boids[i].handleBorders(width, height, model.bound);
				boids[i].applyBehaviors(neighbours, {
					align: model.align,
					cohesion: model.cohesion,
					perception: model.perception,
					separate: model.separate
				});
				boids[i].move();
				boids[i].render({ context, height, width }, model.showPerception, model.perception);
			} else {
				boids[i].handleBorders(width, height, model.bound);
				boids[i].applyBehaviors(boids, {
					align: model.align,
					cohesion: model.cohesion,
					perception: model.perception,
					separate: model.separate
				});
				boids[i].move();
				boids[i].render({ context, height, width });
			}
		}
	};

	return {
		draw,
		setup
	};
};
