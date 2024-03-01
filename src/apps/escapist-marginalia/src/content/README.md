# Content pages

The directory contains collections as pages:

- blogpost;
- gallery;
- project;
- sketch.

## Page frontmatter

Each page frontmatter has interface:

```ts
interface Page {
	"cover"?: string;
	"dateCreated"?: ISOString;
	"dateUpdated": ISOString;
	"description": string;
	"keywords": string[];
	"layout"?: string;
	"slug": string;
	"title": string;
	"translation"?: {
		lang: "русский" | "english;
		slug: string;
	};
}
```

### Page

```ts
interface Page {
	"description": string;
	"keywords": string[];
	"lang": "en" | "ru;
	"slug": string;
	"title": string;
	"updated": ISOString;
}
```

### Blogpost

```ts
interface PageBlogpost {
	"cover": string;
	"created": ISOString;
	"description": string;
	"keywords": string[];
	"lang": "en" | "ru;
	"layout": "blogpost";
	"slug": string;
	"title": string;
	"translation"?: {
		lang: "русский" | "english;
		slug: string;
	};
	"updated": ISOString;
}
```

### Gallery

```ts
interface Image {
	height: number;
	src: string;
	width: string;
}

interface PageGalleryItem {
	camera: string;
	dateCreated: string;
	dateTaken: string;
	dateUpdated?: string;
	description: string;
	dominant: [ r: number, g: number, b: number ];
	fnumber: number;
	focalLength: number;
	fullsize: Image;
	id: string;
	iso: number;
	keywords?: string[];
	lang: "en" | "ru";
	layout: "gallery";
	lens: string;
	og: Image;
	shutter: string;
	slug: string;
	thumbnail: Image;
	thumbnailSquare: Image;
	title: string;
}
```

### Project

```ts
interface PageProject {
	"description": string;
	"featured": boolean;
	"lang": "en" | "ru;
	"layout": "project";
	"maintained": boolean;
	"name": string;
	"npm": string;
	"repository": string;
	"techstack": string[];
	"type": string;
	"updated": ISOString;
	"website": string;
}
```

### Sketch

```ts
interface PageSketch {
	"cover": string;
	"description": string;
	"keywords": string[];
	"lang": "en" | "ru";
	"layout": "sketch";
	"title": string;
	"updated": ISOString;
	"url": string;
}
```
