export interface Options {
	background: string;
	color: string;
	distributed: boolean;
	chars: Array<"digits" | "katakana" | "math" | "uppercaseLetters">;
	depth: number;
	fade: number;
	scale: number;
}

export const options: Options = {
	background: "0 0 0",
	color: "#00FA00",
	distributed: true,
	chars: [ "digits", "katakana", "math", "uppercaseLetters" ],
	depth: 0.25,
	fade: 0.1,
	scale: 10
};

export const optionsImmutable: Set<keyof Options> = new Set([
	"scale",
	"background",
	"color",
	"depth"
]);
