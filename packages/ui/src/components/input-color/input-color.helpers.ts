import type { ColorModelHSL, ColorStringHSL } from "../../types";

export const DEFAULT_MODEL: ColorModelHSL = {
	h: 0,
	l: 50,
	o: 100,
	s: 50
};

export const colorToString = (value = DEFAULT_MODEL, opaque = false): ColorStringHSL => {
	if (opaque) {
		return `hsl(${value.h}deg ${value.s}% ${value.l}%)`;
	}

	return `hsl(${value.h}deg ${value.s}% ${value.l}% / ${value.o}%)`;
};

export const getContrast = (value = DEFAULT_MODEL): ColorStringHSL => {
	return colorToString({
		...value,
		l: Math.round(value.l >= 50 ? value.l / 2 : value.l * 2),
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
		o: match[3] ? Number(match[5]) : 1,
		s: Number(match[3])
	};
};
