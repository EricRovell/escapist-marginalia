export interface CropFactor {
	cf: number;
	height: number;
	name: string;
	width: number;
	usage?: string;
}

export const cropFactorData = [
	{
		cf: 6.3,
		height: 4.1,
		name: "1/2.6″",
		width: 5.5,
		usage: "Samsung Galaxy S9, Note9, S8, S7, S6, Note5"
	},
	{
		cf: 5.6,
		height: 4.56,
		name: "1/2.3″",
		width: 6.17,
		usage: "Canon PowerShot SX280HS, Olympus Tough TG-2"
	},
	{
		cf: 4.7,
		height: 5.58,
		name: "1/1.7″",
		width: 7.44,
		usage: "Canon PowerShot S95, S100, S110, S120"
	},
	{
		cf: 3.9,
		height: 6.60,
		name: "2/3″",
		width: 8.80,
		usage: "Nokia Lumia 1020 smartphone with 41 MP camera; Fujifilm X-S1, X20, XF1"
	},
	{
		cf: 2.7,
		height: 8.80,
		name: "1”",
		width: 13.20,
		usage: "Sony RX100 & RX10, Nikon CX, Panasonic ZS100, ZS200, FZ1000"
	},
	{
		cf: 2.0,
		height: 13,
		name: "Micro Four Thirds, 4/3",
		width: 17.30
	},
	{
		cf: 1.6,
		height: 14.80,
		name: "APS-C (Canon)",
		width: 22.20,
		usage: "Canon EF-S"
	},
	{
		cf: 1.53,
		height: 15.60,
		name: "APS-C",
		width: 24,
		usage: "Nikon DX, Sony NEX/Alpha DT, Pentax K"
	},
	{
		cf: 1.0,
		height: 24,
		name: "35mm full-frame",
		width: 36,
		usage: "Nikon FX, Sony Alpha/Alpha FE, Canon EF"
	},
	{
		cf: 0.71,
		height: 36.80,
		name: "Medium Format",
		width: 49,
		usage: "Kodak KAF 39000 CCD"
	}
];
