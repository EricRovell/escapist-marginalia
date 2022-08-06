import { readdir, rename } from "fs/promises";
import path, { extname } from "path";
import ExifReader from "exifreader";
import { cwd } from "process";

const PATH_INPUT = "media/gallery";
const PATH_ROOT = cwd();

/**
 * Generates the gallery image ID as it's creation date.
 */
async function getID(filePath) {
	const tags = await ExifReader.load(filePath, {
		includeUnknown: true
	});

	return tags["DateTimeDigitized"]?.description.replace(/:|\s/g, "");
}

/**
 * Prepares input gallery images setting their name as ID.
 */
async function renameImages() {
	const inputDir = path.join(PATH_ROOT, PATH_INPUT);

	try {
		const files = await readdir(inputDir);
		
		for (const file of files) {
			const filePath = path.join(inputDir, file);
			const id =  await getID(filePath);
			await rename(
				filePath,
				path.join(inputDir, `${id}.${extname(filePath)}`)
			);
		}

	} catch (error) {
		console.log(error);
	}
}

void renameImages();
