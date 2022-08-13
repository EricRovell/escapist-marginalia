<script lang="ts">
	import { t } from "@core/i18n";
	import { webpageRoot, webpage } from "@paths";
	import { Button, Icon, Image, Link, Meta, ImageFullscreen } from "@components";
	import { iconShare, iconDownload, iconFullscreen } from "$lib/components/icons/default";
	import { share } from "@utils/helpers";
	import type { GalleryItem } from "@types";	
	import styles from "./.id.module.css";

	export let image: GalleryItem;

	let open = false;

	const handleShare = async () => {
		const files = [];

		try {
			const request = await fetch(image.src);
			const blob = await request.blob();

			files.push(
				new File([ blob ], `${image.title}.webp`, {
					type: blob.type
				})
			);
		} catch(error) {
			console.error(`Could not load the image: ${error.message}`);
		}

		await share({
			files,
			url: $webpage,
			title: image.title,
			text: image.description
		});
	};
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
		image: `${$webpageRoot}${image.thumb.cover}`,
	}}
	twitter={{
		card: "summary",
		title: image.title,
		description: image.description,
		url: $webpage
	}}
/>

<main class={styles.container}>
	<section class="surface-2 {styles["image"]}" label="img">
		<Image
			src={image.src}
			width={image.width}
			height={image.height}
			alt={image.description}
			on:click={() => open = !open}
		/>
		<aside class="{styles.actions}">
			<Button
				appearance="ghost"
				icon
				title="{$t("tooltip.share")}"
				on:click={handleShare}
			>
				<Icon path={iconShare} />
			</Button>
			<Link
				download="{image.title}"
				href="{image.src}"
				title="{$t("tooltip.download")}"
			>
				<Icon path={iconDownload} />
			</Link>
			<Button
				appearance="ghost"
				icon
				title="{$t("tooltip.fullscreen")}"
				on:click={() => open = true}
			>
				<Icon path={iconFullscreen} />
			</Button>
		</aside>
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
						<li class="surface-2">{keyword}</li>
					{/each}
				</ul>
			</div>
		</section>
	</div>
</main>

<ImageFullscreen bind:open>
	<Image
		src={image.src}
		width={image.width}
		height={image.height}
		alt={image.description}
	/>
</ImageFullscreen>
