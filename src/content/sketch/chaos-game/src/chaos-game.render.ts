import type { Renderer } from "@components/canvas";
import { options as optionsDefault, type Options } from "./chaos-game.options";
import { Chaos, Polygon } from "../lib";

export const sketch = (options: Options = optionsDefault) => {
	let polygon: Polygon;
	let chaos: Chaos;
	let counter = 0;

	const setup: Renderer = ({ context, width, height }) => {
		context.translate(width / 2, height / 2);

		polygon = new Polygon(
			options["polygon-sides"],
			options["polygon-scale"] * height,
			{ x: 0, y: 0, angle: options["polygon-origin-theta"] / 180 * Math.PI }
		);

		chaos = new Chaos(polygon);

		if (options["polygon-visible"]) {
			context.strokeStyle = options["polygon-color"];
			context.lineWidth = options["polygon-line-width"];
			context.beginPath();
			context.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);

			for (let i = 1; i < polygon.n; i++) {
				context.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
			}

			context.closePath();
			context.stroke();
		}
	};

	const draw = ({ context }) => {
		if (counter >= options["points-limit"]) {
			return;
		}

		for (const { position, color } of chaos.moves(options.speed)) {
			context.fillStyle = color;

			context.beginPath();
			context.arc(position.x, position.y, options["point-scale"], 0, 2 * Math.PI, false);
			context.closePath();
			context.fill();
		}

		counter += options.speed;
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
