import type { Color, ColorStringHSL } from "./input-color.types";

export const colorDefault: Color = {
	hue: 0,
	saturation: 50,
	lightness: 50,
	opacity: 1
};

export const convertColorToString = (value: Color = colorDefault): ColorStringHSL => {
	return `hsl(${value.hue}deg ${value.saturation}% ${value.lightness}% / ${value.opacity})`;
};

export const getContrast = (value: Color = colorDefault): ColorStringHSL => {
	let { lightness } = value;

	lightness = (lightness >= 50)
		? Math.round(lightness / 2)
		: Math.round(lightness * 2);

	return convertColorToString({ ...value, lightness });
};

/**
 * Matches the HSL color functional whitespace syntax string:
 * 
 * `hsl(<hue> <percentage> <percentage> [/ <alpha-value>])`
 */
export const colorMatcher = /^hsl\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i;

export const parseColorString = (input: ColorStringHSL): Color => {
	if (!colorMatcher.test(input)) {
		return colorDefault;
	}

	const match = input.match(colorMatcher);

	return {
		hue: Number(match[1]),
		saturation: Number(match[3]),
		lightness: Number(match[4]),
		opacity: match[3] ? Number(match[5]) : 1
	};
};
