export interface Options {
	background: string;
	chars: Array<"digits" | "katakana" | "math" | "uppercaseLetters">;
	color: string;
	depth: number;
	distributed: boolean;
	fade: number;
	randomColors: boolean;
	scale: number;
}

export const options: Options = {
	background: "#000000",
	color: "#00FA00",
	chars: [ "digits", "katakana", "math", "uppercaseLetters" ],
	depth: 0.25,
	distributed: true,
	fade: 0.1,
	randomColors: false,
	scale: 10
};

export const optionsImmutable: Set<keyof Options> = new Set([
	"scale",
	"background",
	"color",
	"depth"
]);
