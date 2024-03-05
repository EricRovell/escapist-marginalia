export interface Color {
	hue: number;
	saturation: number;
	lightness: number;
	opacity: number;
}

export type ColorString = `hsl(${number} ${number}% ${number}% / ${number})`;
