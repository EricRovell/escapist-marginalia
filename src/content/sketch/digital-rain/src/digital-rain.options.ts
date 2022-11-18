export interface Options {
	scale: number;
	background: string;
	color: string;
	frameRate: number;
	depthRange: [ number, number ],
	charcodes: Array<[ number, number ]>;
}

export const options: Options = {
	scale: 10,
	background: "rgb(0 0 0 / 0.05)",
	color: "#00FA00",
	frameRate: 15,
	depthRange: [ 50, 10000 ],
	charcodes: [
		[ 48, 57 ],     // digits
		[ 65, 90 ],     // capital letters
		[ 8704, 8959 ]  // math symbols
	]
};
