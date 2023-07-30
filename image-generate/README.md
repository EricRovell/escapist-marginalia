# Gallery

Each gallery image has an `id` and it's dedicated page at `/{locale}/gallery/{slug}`.

## Gallery image page

Gallery image page containts frontmatter metadata:

```ts
interface GalleryImage {
	height: number;
	src: string;
	width: string;
}

interface GalleryItemPage {
	camera: string;
	dateCreated: string;
	dateTaken: string;
	dateUpdated?: string;
	description: string;
	dominant: [ r: number, g: number, b: number ];
	fnumber: number;
	focalLength: number;
	fullsize: GalleryImage;
	id: string;
	iso: number;
	keywords?: string[];
	lang: "en" | "ru";
	layout: "gallery";
	lens: string;
	og: GalleryImage;
	shutter: string;
	slug: string;
	thumbnail: GalleryImage;
	thumbnailSquare: GalleryImage;
	title: string;
}
```

## Config

Process config interface:

```ts
interface Config {
	pathInput: string;
	pathOutput: string;
	pathPages: string;
	buildImagePath: (filename: string) => string;
}
```

- `pathInput` specifies the path with images to process;
- `pathOutput` specifies the path for processed images;
- `pathPages` specifies the path for generated `*.svx` pages;
- `buildImagePath` constructs a path where image will be stored upon upload.

## Image

- Each image gets an `id` based on it's slugified title (in english);
- The `id` is used as page directory name;

## Processing

### Metadata

Each image is parsed for metadata using `ExifReader`:

```ts
interface ImageMetadata {
	camera: string;
	fnumber: string;
	date: string;
	description: string;
	focalLength: number;
	id: string;
	iso: number;
	keywords: string[];
	lens: string;
	title: string;
	shutter: string;
}
```

### Formats

Each image processed into:

- `{id}.jpeg`;
- `{id}.webp`;
- `{id}.og.jpeg` - for OpenGraph cover;
- `{id}.thumb.jpeg` - for preserved aspect-ratio thumbnail;
- `{id}.thumb.webp` - for preserved aspect-ratio thumbnail;
- `{id}.thumbsq.jpeg` - for square thumbnail;
- `{id}.thumbsq.webp` - for square thumbnail.

OpenGraph cover and square thumbnail are cropped.

Also, the `dominant` color saved as an `rgb` array.

### Pages

The image metadata is used to generate the pages as: `{config.pathPages}/{id}/index.{locale}.svx`.

If the page was already present, the body contents remains untouched, and the frontmatter is updated only with missing data to avoid losing data. In order to get the image metadata the specific data should be removed from the page:

```js
{
	...parsedMetadata,
	...presentMetadata
}
```
