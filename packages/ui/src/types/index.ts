export type Appearance = "fill" | "ghost" | "outline" | "text";
export type Variant = "accent" | "danger" | "info" | "neutral" | "success" | "warning";

/**
 * Utility type to describe classes object to pass class names into
 * component parts:
 *
 * ```
 * Classes<"input" | "label"> -> { input?: string, label?: string };
 * ```
 */
export type Classes<T extends string> = Partial<Record<T, string>>;

export interface ColorModelHSL {
	/** hue */
	h: number;
	/** lightness */
	l: number;
	/** opacity */
	o: number;
	/** saturation */
	s: number;
}

export type ColorStringHSL =
	| `hsl(${number}deg ${number}% ${number}%)`
	| `hsl(${number}deg ${number}% ${number}% / ${number}%)`;
