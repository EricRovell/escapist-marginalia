/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { readdir, mkdir, writeFile } from "fs/promises";
import path from "path";
import ExifReader from "exifreader";
import sharp from "sharp";
import { cwd } from "process";

const PATH_INPUT = "src/content/gallery";
const PATH_OUTPUT = "static/img";
const PATH_JSON = "src/data";
const PATH_ROOT = cwd();

/* in case `static` folder is used, it should not be specified */
const SRC_IMG = "/img";

/**
 * Parses the subset metadata of the image.
 */
async function parseMetadata(filePath) {
	const tags = await ExifReader.load(filePath, {
		includeUnknown: true
	});

	return {
		aperture: tags["FNumber"]?.description,
		camera: tags["Model"]?.description,
		date: tags["DateTimeDigitized"]?.description,
		description: tags["description"]?.description,
		focalLength: tags["FocalLength"]?.description,
		id: tags["DateTimeDigitized"]?.description.replace(/:|\s/g, ""),
		iso: tags["ISOSpeedRatings"]?.value,
		keywords: tags["Keywords"]?.map(item => item.description),
		lens: tags["LensModel"]?.description,
		title: tags["title"]?.description,
		shutterSpeed: tags["ShutterSpeedValue"]?.description
	};
}

/**
 * Processes the image generating it's optimized version and it's thumbnail.
 */
async function processImage({ filePath, pathOutput, id }) {
	const img = sharp(filePath);

	const { dominant } = await img.stats();

	const imgMain = await img
		.webp({ quality: 85 })
		.resize({ width: 1440 })
		.toFile(path.join(pathOutput, `${id}.webp`));

	const imgThumb = await img
		.webp({ quality: 75 })
		.resize({ width: 350 })
		.toFile(path.join(pathOutput, `${id}.thumb.webp`));

	/** TODO: 
	 * Some services do not support WEBP for OG:IMAGE
	 * Remove when they will do.
	 *  */
	await img
		.jpeg({ quality: 70 })
		.resize(350, 350)
		.toFile(path.join(pathOutput, `${id}.og.jpeg`));

	return {
		width: imgMain.width,
		height: imgMain.height,
		src: `${SRC_IMG}/${id}.webp`,
		thumb: {
			width: imgThumb.width,
			height: imgThumb.height,
			src: `${SRC_IMG}/${id}.thumb.webp`,
			cover: `${SRC_IMG}/${id}.og.jpeg`
		},
		dominant: [ dominant.r, dominant.g, dominant.b ]
	};
}

/**
 * Processes the gallery images, generating optimized versions and generating metadata file.
 */
async function processImages() {
	const pathInput = path.join(PATH_ROOT, PATH_INPUT);
	const pathOutput = path.join(PATH_ROOT, PATH_OUTPUT);

	await mkdir(pathOutput, { recursive: true });

	const data = [];

	try {
		const files = await readdir(pathInput);
		
		for (const file of files) {
			const filePath = path.join(pathInput, file);
			const metadata =  await parseMetadata(filePath, pathOutput);
			const processedMetadata = await processImage({
				filePath,
				pathOutput,
				id: metadata.id
			});

			data.push({
				...metadata,
				...processedMetadata
			});
		}

		await writeFile(
			path.join(path.join(PATH_ROOT, PATH_JSON), "gallery.json"),
			JSON.stringify(data, undefined, 2)
		);

	} catch (error) {
		console.log(error);
	}
}

void processImages();
