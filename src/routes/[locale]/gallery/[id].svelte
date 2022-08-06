<script lang="ts">
	import { webpageRoot, webpage } from "@paths";
	import { Image, Meta } from "@components";
	import type { GalleryItem } from "@types";	
	import styles from "./.id.module.css";

	export let image: GalleryItem;
</script>

<Meta
	title={image.title}
	meta={{
		description: image.description,
		keywords: image.keywords.toString()
	}}
	openGraph={{
		title: image.title,
		description: image.description,
		url: $webpage,
		image: `${$webpageRoot}${image.thumb.src}`,
	}}
	twitter={{
		card: "summary",
		title: image.title,
		description: image.description,
		url: $webpage
	}}
/>

<main class={styles.container}>
	<section class={styles["image"]} label="img">
		<Image
			src={image.src}
			width={image.width}
			height={image.height}
			alt={image.description}
		/>
	</section>
	<h1 class="{styles.title}">
		&ldquo{image.title}&rdquo
	</h1>
	<div class="{styles.metadata}">
		<section>
			<dl aria-label="camera">
				<dt>Camera</dt>
				<dd>{image.camera}</dd>
				<dt>Lens</dt>
				<dd>{image.lens}</dd>
			</dl>
			<dl aria-label="parameters">
				<dt>Aperture</dt>
				<dd>{image.aperture}</dd>
				<dt>ISO</dt>
				<dd>{image.iso}</dd>
				<dt>Shutter Speed</dt>
				<dd>{image.shutterSpeed}</dd>
				<dt>Focal Length</dt>
				<dd>{image.focalLength}</dd>
			</dl>
		</section>
		<section>
			<dl aria-label="date">
				<dt>Taken on</dt>
				<dd>{image.date}</dd>
				<dt>Copyright</dt>
				<dd>ERIC_ROVELL</dd>
			</dl>
			<div class="{styles.keywords}">
				<h3>Keywords</h3>
				<ul>
					{#each image.keywords as keyword}
						<li>{keyword}</li>
					{/each}
				</ul>
			</div>
		</section>
	</div>
</main>
