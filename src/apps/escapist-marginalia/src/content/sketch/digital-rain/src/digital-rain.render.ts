import type { Renderer } from "ui";
import { randFloat, randInt, randColor } from "utils/random";

import { options as optionsDefault, type Options } from "./digital-rain.options";
import { getRandomChar } from "./digital-rain.util";
import type { Sketch } from "@components/sketch/sketch.types";

export const sketch: Sketch<Options> = (options = optionsDefault) => {
	let columns: number;
	let data: number[];
	let frame = 0;
	let rows: number;

	const setup: Renderer = ({ height, width }) => {
		columns = Math.floor(width / options.scale) + 1;
		rows = Math.floor(height / options.scale) + 1;
		data = new Array(columns).fill(height).map(() => randInt(0, rows));
	};

	const draw: Renderer = ({ context, width, height }) => {
		frame++;

		if (frame % 5 !== 0) {
			return;
		}

		context.fillStyle = `${options.background}`;
		context.fillRect(0, 0, width, height);
		context.fillStyle = options.color;

		// (x, y) as (index * scale, value * scale)
		for (let i = 0; i < columns; i++) {
			if (options.randomColors) {
				context.fillStyle = randColor();
			}

			const value = data[i];
			const char = getRandomChar(options.chars);
			const depth = height * 2 * randFloat(0, options.depth);

			context.fillText(char, i * options.scale, value * options.scale);

			if (value >= rows || value > depth) {
				data[i] = options.distributed ? randInt(0, rows) : 0;
			} else {
				data[i] = value + 1;
			}
		}

		frame = 0;
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
