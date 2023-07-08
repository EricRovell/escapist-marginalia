import path from "node:path";
import { cwd } from "node:process";
import { readFile, readdir } from "node:fs/promises";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

import "dotenv/config";
import { CONFIG } from "../../config.js";

const PATH_ROOT = cwd();

const client = new S3Client({
	region: "ru-central1",
	endpoint: "https://storage.yandexcloud.net",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	}
});

const filesDir = path.join(PATH_ROOT, CONFIG.pathOutput);

try {
	const files = await readdir(filesDir);

	for (const file of files) {
		const filePath = path.join(filesDir, file);
		const key = path.basename(filePath);
		const data = await readFile(filePath);

		await client.send(
			new PutObjectCommand({
				Bucket: process.env.BUCKET_NAME,
				Key: `${process.env.BUCKET_FOLDER_NAME}/${key}`,
				Body: data
			})
		);
	}

} catch (error) {
	console.log(error);
}
