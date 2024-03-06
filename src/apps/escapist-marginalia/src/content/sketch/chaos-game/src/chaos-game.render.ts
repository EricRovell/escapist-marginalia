import { Chaos, createPolygon, type Polygon } from "chaos-game";
import type { Renderer } from "ui";

import { DEFAULT_OPTIONS, type Options } from "./chaos-game.options";

export const sketch = (options: Options = DEFAULT_OPTIONS) => {
	let polygon: Polygon;
	let chaos: Chaos;
	let counter = 0;
	const colorWheel: string[] = [];

	const setup: Renderer = ({ context, width, height }) => {
		context.translate(width / 2, height / 2);

		polygon = createPolygon(
			options["polygon-sides"],
			options["polygon-scale"] * Math.min(height, width),
			{ angle: options["polygon-origin-theta"] / 180 * Math.PI }
		);

		chaos = new Chaos(polygon, {
			step: {
				factor: options["step-factor"],
				value: options["step-factor"] ? options["step-coef"] : options["step-distance"]
			},
			distances: options["restrictions"]
		});

		for (const { phi } of polygon.verticesPolar) {
			colorWheel.push(`hsl(${Math.round(phi * 180 / Math.PI)} 75% 50%)`);
		}

		if (options["polygon-visible"]) {
			context.strokeStyle = options["polygon-color"];
			context.lineWidth = options["polygon-line-width"];
			context.beginPath();
			context.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);

			for (let i = 1; i < polygon.sides; i++) {
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

		for (const { position, verticeIndex } of chaos.moves(options.speed)) {
			context.fillStyle = options["points-color-wheel"]
				? colorWheel[verticeIndex]
				: options["points-color"];

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
