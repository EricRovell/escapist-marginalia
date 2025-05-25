import type { ColorModelHSL, ColorStringHSL } from "../../types";

export const DEFAULT_MODEL: ColorModelHSL = {
	h: 0,
	l: 50,
	o: 100,
	s: 50
};

export const toColorString = (value = DEFAULT_MODEL, opaque = false): ColorStringHSL => {
	if (opaque) {
		return `hsl(${value.h}deg ${value.s}% ${value.l}%)`;
	}

	return `hsl(${value.h}deg ${value.s}% ${value.l}% / ${value.o}%)`;
};

export const getContrast = (value = DEFAULT_MODEL): ColorStringHSL => {
	let lightness = 0;

	if (value.l === 0) {
		lightness = 50;
	} else if (value.l >= 50) {
		lightness = value.l / 2;
	} else {
		lightness = value.l * 2;
	}

	return toColorString({
		...value,
		l: lightness,
		o: 100
	});
};

/**
 * Matches the HSL color functional whitespace syntax string:
 *
 * `hsl(<hue> <percentage> <percentage> [/ <alpha-value>])`
 */
export const colorMatcher = /^hsl\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;

export const parseColorString = (input: ColorStringHSL): ColorModelHSL => {
	if (!colorMatcher.test(input)) {
		return DEFAULT_MODEL;
	}

	const match = colorMatcher.exec(input);

	if (!match) {
		return DEFAULT_MODEL;
	}

	return {
		h: Number(match[1]),
		l: Number(match[4]),
		o: match[5] ? Number(match[5]) : 100,
		s: Number(match[3])
	};
};
