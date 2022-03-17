import type { Size } from "./Gallery.types";

/**
 * Generates grid spans from image dimentions and grid's cell size.
 */
export function getItemsSpan({ width, height }: Size, cellSize = 400): string {
	return `
		--column-end: span ${Math.floor(width / cellSize)};
		--row-end: span ${Math.floor(height / cellSize)};
	`;
}