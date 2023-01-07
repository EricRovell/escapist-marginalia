export interface Options {
	"points-color-wheel": boolean;
	"points-color": string;
	"points-color-opacity": number;
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
	"step-coef": number;
	"step-distance": number;
	"step-factor": boolean;
}

export const options: Options = {
	"points-color-wheel": true,
	"points-color": "#FAFAFA",
	"points-color-opacity": 1,
	"point-scale": 1,
	"points-limit": 5000,
	"polygon-color": "#FF0000",
	"polygon-color-opacity": 0.5,
	"polygon-line-width": 2,
	"polygon-origin-theta": 0,
	"polygon-scale": 0.45,
	"polygon-sides": 3,
	"polygon-visible": true,
	"speed": 10,
	"step-coef": 0.5,
	"step-distance": 1,
	"step-factor": true
};

export const optionsImmutable: Set<keyof Options> = new Set([
	"points-color-wheel",
	"points-color-opacity",
	"polygon-color",
	"polygon-color-opacity",
	"polygon-line-width",
	"polygon-origin-theta",
	"polygon-scale",
	"polygon-sides",
	"polygon-visible",
	"step-coef",
	"step-distance",
	"step-factor"
]);
