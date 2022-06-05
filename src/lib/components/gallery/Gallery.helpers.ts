import type { Size } from "./Gallery.types";

/**
 * Generates grid spans from image dimentions and grid's cell size.
 */
export function getMasonryItemSpan({ width, height }: Size, scale = 400): string {
	return `
		--masonry-item-column: span ${Math.floor(width / scale)};
		--masonry-item-row: span ${Math.floor(height / scale)};
	`;
}