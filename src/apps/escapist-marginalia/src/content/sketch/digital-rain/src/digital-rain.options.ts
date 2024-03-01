export interface Options {
	background: string;
	chars: Array<"digits" | "katakana" | "math" | "uppercaseLetters">;
	color: string;
	depth: number;
	distributed: boolean;
	randomColors: boolean;
	scale: number;
}

export const options: Options = {
	background: "hsl(0 0% 0% / 0.1)",
	color: "hsl(120 100% 50% / 1)",
	chars: [ "digits", "katakana", "math", "uppercaseLetters" ],
	depth: 0.25,
	distributed: true,
	randomColors: false,
	scale: 10
};

export const optionsImmutable: Set<keyof Options> = new Set([
	"scale",
	"background",
	"color",
	"depth"
]);
