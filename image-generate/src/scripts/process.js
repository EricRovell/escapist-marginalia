import { readdir, mkdir } from "fs/promises";
import { existsSync, openSync, closeSync, writeFileSync } from "fs";
import path from "path";
import { cwd } from "process";

import ExifReader from "exifreader";
import sharp from "sharp";
import matter from "gray-matter";

import { jsonStringifyOrdered, slugify, timestampFromString, resize } from "../helpers/index.js";

import { CONFIG } from "../../config.js";

const PATH_ROOT = cwd();

/**
 * Parses the subset metadata of the image.
 */
async function parseImageMetadata(filePath) {
	const tags = await ExifReader.load(filePath, {
		includeUnknown: true
	});

	const keywords = Array.isArray(tags["Keywords"])
		? tags["Keywords"].map(item => item.description)
		: [];

	const data = {
		camera: tags["Model"]?.description,
		fnumber: tags["FNumber"]?.value[0],
		dateTaken: timestampFromString(
			tags["DateTimeDigitized"]?.description
		),
		description: tags["description"]?.description,
		focalLength: tags["FocalLength"]?.value[0],
		id: slugify(
			path.parse(filePath).name
		),
		iso: Number(tags["ISOSpeedRatings"]?.value),
		keywords,
		lens: tags["LensModel"]?.description,
		title: tags["title"]?.description,
		shutter: tags["ShutterSpeedValue"]?.description
	};

	return data;
}

/**
 * Processes the image generating it's optimized version and it's thumbnail.
 */
async function processImage({ filePath, pathOutput, id }) {
	const img = sharp(filePath);
	const vertical = img.height > img.width;
	const { dominant } = await img.stats();

	const imgFullJpeg = await img
		.jpeg({ quality: 80 })
		.resize(resize(1800, vertical))
		.toFile(path.join(pathOutput, `${id}.jpeg`));

	await img
		.webp({ quality: 80 })
		.resize(resize(1800, vertical))
		.toFile(path.join(pathOutput, `${id}.webp`));

	const imgThumbJpeg = await img
		.jpeg({ quality: 80 })
		.resize(resize(450, vertical))
		.toFile(path.join(pathOutput, `${id}.thumb.jpeg`));

	await img
		.webp({ quality: 80 })
		.resize(resize(450, vertical))
		.toFile(path.join(pathOutput, `${id}.thumb.webp`));

	const imgThumbSquareJpeg = await img
		.jpeg({ quality: 80 })
		.resize({
			width: 450,
			height: 450,
			fit: "cover",
			position: "entropy"
		})
		.toFile(path.join(pathOutput, `${id}.thumbsq.jpeg`));

	await img
		.webp({ quality: 80 })
		.resize({
			width: 450,
			height: 450,
			fit: "cover",
			position: "entropy"
		})
		.toFile(path.join(pathOutput, `${id}.thumbsq.webp`));

	const imgOgJpeg = await img
		.jpeg({ quality: 80 })
		.resize({
			width: 1200,
			height: 630,
			fit: "cover",
			position: "entropy"
		})
		.toFile(path.join(pathOutput, `${id}.og.jpeg`));

	return {
		dominant,
		fullsize: {
			height: imgFullJpeg.height,
			width: imgFullJpeg.width,
			src: CONFIG.buildImagePath(`${id}`),
		},
		og: {
			height: imgOgJpeg.height,
			width: imgOgJpeg.width,
			src: CONFIG.buildImagePath(`${id}.og`)
		},
		thumbnail: {
			height: imgThumbJpeg.height,
			width: imgThumbJpeg.width,
			src: CONFIG.buildImagePath(`${id}.thumb`),
		},
		thumbnailSquare: {
			height: imgThumbSquareJpeg.height,
			width: imgThumbSquareJpeg.width,
			src: CONFIG.buildImagePath(`${id}.thumbsq`),
		}
	};
}

async function updateFrontmatter(data) {
	const pathPages = path.join(PATH_ROOT, CONFIG.pathPages);

	for (const item of data) {
		const { id } = item;
		const pathPage = path.join(pathPages, id);
		const pathPageFileEn = path.join(pathPage, "index.en.svx");
		const pathPageFileRu = path.join(pathPage, "index.ru.svx");

		if (!existsSync(pathPage)) {
			await mkdir(pathPage);
		}

		const pages = [
			{
				path: pathPageFileEn,
				lang: "en"
			},
			{
				path: pathPageFileRu,
				lang: "ru"
			}
		];

		for (const page of pages) {
			closeSync(openSync(page.path, "a"));

			const pageData = matter.read(page.path);

			pageData.data = {
				...item,
				lang: page.lang,
				layout: "gallery",
				slug: encodeURI(item.id),
				dateCreated: Date.now(),
				...pageData.data
			};

			const contents = [
				"---",
				jsonStringifyOrdered(pageData.data, "\t"),
				"---",
				pageData.content
			].join("\n");

			writeFileSync(page.path, contents);
		}
	}
}

async function main() {
	const pathInput = path.join(PATH_ROOT, CONFIG.pathInput);
	const pathOutput = path.join(PATH_ROOT, CONFIG.pathOutput);

	await mkdir(pathOutput, { recursive: true });

	const data = [];

	try {
		const files = await readdir(pathInput);

		for (const file of files) {
			const filePath = path.join(pathInput, file);
			const metadata =  await parseImageMetadata(filePath);
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

	} catch (error) {
		console.error(error);
	}

	await updateFrontmatter(data);
}

void main();
