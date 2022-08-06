import type { Size } from "./Gallery.types";

/**
 * Generates grid spans from image dimentions and grid's cell size.
 */
export function getMasonryItemSpan({ width, height }: Size, scale = 50): string {
	return `
		--masonry-item-column: span ${Math.round(width / scale)};
		--masonry-item-row: span ${Math.round(height / scale)};
	`;
}