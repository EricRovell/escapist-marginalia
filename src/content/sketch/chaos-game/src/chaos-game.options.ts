export interface Options {
	"point-scale": number;
	"points-limit": number;
	"polygon-color": string;
	"polygon-color-opacity": number;
	"polygon-line-width": number;
	"polygon-origin-theta": number;
	"polygon-scale": number;
	"polygon-sides": number;
	"polygon-visible": boolean;
	"speed": number;
	"step-factor": boolean;
	"step-value": number;
}

export const options: Options = {
	"point-scale": 1,
	"points-limit": 2500,
	"polygon-color": "#FF0000",
	"polygon-color-opacity": 0.5,
	"polygon-line-width": 2,
	"polygon-origin-theta": 0,
	"polygon-scale": 0.45,
	"polygon-sides": 3,
	"polygon-visible": true,
	"speed": 5,
	"step-factor": true,
	"step-value": 0.5
};

export const optionsImmutable: Set<keyof Options> = new Set([
	"polygon-color",
	"polygon-color-opacity",
	"polygon-line-width",
	"polygon-origin-theta",
	"polygon-scale",
	"polygon-sides",
	"polygon-visible",
	"step-factor",
	"step-value"
]);
