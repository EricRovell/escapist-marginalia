import { Chaos, createPolygon, type Polygon } from "chaos-game";
import { type Renderer, type SketchConstructor, useSketch } from "sketch";

import { useModel } from "./chaos-game.model";

export const sketch: SketchConstructor = () => () => {
	const { model } = useModel();
	const { handlePlayState } = useSketch();

	let polygon: Polygon;
	let chaos: Chaos;
	let counter = 0;
	const colorWheel: string[] = [];

	const setup: Renderer = ({ context, height, width }) => {
		context.translate(width / 2, height / 2);
		counter = 0;

		polygon = createPolygon(
			model["polygon-sides"],
			model["polygon-scale"] * Math.min(height, width),
			{ angle: model["polygon-origin-theta"] / 180 * Math.PI }
		);

		chaos = new Chaos(polygon, {
			distances: model.restrictions,
			step: {
				factor: model["step-factor"],
				value: model["step-factor"] ? model["step-coef"] : model["step-distance"]
			}
		});

		for (const { phi } of polygon.verticesPolar) {
			colorWheel.push(`hsl(${Math.round(phi * 180 / Math.PI)} 75% 50%)`);
		}

		if (model["polygon-visible"]) {
			context.strokeStyle = model["polygon-color"];
			context.lineWidth = model["polygon-line-width"];
			context.beginPath();
			context.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);

			for (let i = 1; i < polygon.sides; i++) {
				context.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
			}

			context.closePath();
			context.stroke();
		}
	};

	const draw: Renderer = ({ context }) => {
		if (counter >= model["points-limit"]) {
			handlePlayState(false);
			return;
		}

		for (const { position, verticeIndex } of chaos.moves(model.speed)) {
			context.fillStyle = model["points-color-wheel"]
				? colorWheel[verticeIndex]
				: model["points-color"];

			context.beginPath();
			context.arc(position.x, position.y, model["point-scale"], 0, 2 * Math.PI, false);
			context.closePath();
			context.fill();
		}

		counter += model.speed;
	};

	return {
		draw,
		setup
	};
};
