import { randomNumberFromRanges } from "@utils/random";
import { options as optionsDefault, type Options } from "./digital-rain.options";
import type { Renderer } from "@components/canvas";
import type { Sketch } from "@components/sketch/sketch.types";

export const sketch: Sketch<Options> = (options = optionsDefault) => {
	let columns = [];

	const setup: Renderer = ({ width }) => {
		columns = new Array(Math.floor(width / options.scale) + 1).fill(0);
	};

	const draw = ({ context, width, height }) => {
		context.fillStyle = options.background;
		context.fillRect(0, 0, width, height);
		context.fillStyle = options.color;
		columns.forEach((value, index) => {
			// (x, y) as (index * scale, value)
			const randCharcode = randomNumberFromRanges(...options.charcodes);
			context.fillText(String.fromCharCode(randCharcode), index * options.scale, value);
			columns[index] = (value >= height || value > options.depthRange[0] + options.depthRange[1] * Math.random())
				? 0
				: value + options.scale;
		});
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
