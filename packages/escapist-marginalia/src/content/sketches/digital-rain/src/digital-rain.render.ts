import { type Renderer, type SketchConstructor } from "sketch";
import { randColor, randFloat, randInt } from "utils/random";

import { useModel } from "./digital-rain.model";
import { getRandomChar } from "./digital-rain.util";

export const sketch: SketchConstructor = () => () => {
	const { model } = useModel();

	let columns: number;
	let data: number[];
	let frame = 0;
	let rows: number;

	const setup: Renderer = ({ height, width }) => {
		columns = Math.floor(width / model.scale) + 1;
		rows = Math.floor(height / model.scale) + 1;
		data = new Array(columns).fill(height).map(() => randInt(0, rows));
	};

	const draw: Renderer = ({ context, height, width }) => {
		frame++;

		if (frame % 5 !== 0) {
			return;
		}

		context.fillStyle = model.background;
		context.fillRect(0, 0, width, height);
		context.fillStyle = model.color;

		// (x, y) as (index * scale, value * scale)
		for (let i = 0; i < columns; i++) {
			if (model.random_colors) {
				context.fillStyle = randColor();
			}

			const value = data[i];
			const char = getRandomChar(model.chars);
			const depth = height * 2 * randFloat(0, model.depth);

			context.fillText(char, i * model.scale, value * model.scale);

			if (value >= rows || value > depth) {
				data[i] = model.distributed ? randInt(0, rows) : 0;
			} else {
				data[i] = value + 1;
			}
		}

		frame = 0;
	};

	return {
		draw,
		setup
	};
};
