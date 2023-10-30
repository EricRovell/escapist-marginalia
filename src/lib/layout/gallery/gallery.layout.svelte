<script lang="ts">
	import { t } from "@core/i18n";
	import { webpage } from "@core/paths";
	import { Meta,ScrollToTop, Button, Icon, Image, Link, ImageFullscreen, Datetime } from "@components";
	import { iconShare, iconDownload, iconFullscreen } from "@icons";
	import { share } from "@utils/helpers";
	import styles from "./gallery.layout.module.css";
	import articleStyles from "./article.module.css";
	import type { GalleryItemPage } from "@types";

	export let metadata: GalleryItemPage;

	let {
		camera,
		dateCreated,
		dateTaken,
		dateUpdated,
		description,
		fnumber,
		focalLength,
		fullsize,
		iso,
		keywords,
		lang,
		lens,
		og,
		shutter,
		title
	} = metadata;

	let open = false;

	const handleShare = async () => {
		const files = [];

		try {
			const request = await fetch(`${fullsize.src}.jpeg`);
			const blob = await request.blob();

			files.push(
				new File([ blob ], `${title}.jpeg`, {
					type: blob.type
				})
			);
		} catch(error) {
			console.error(`Could not load the image: ${error.message}`);
		}

		await share({
			files,
			url: $webpage,
			title: title,
			text: description
		});
	};

	const metadataList = [
		{ label: "ISO", value: iso },
		{ label: "Camera", value: camera },
		{ label: "Shutter speed", value: shutter },
		{ label: "Lens", value: lens },
		{ label: "Aperture", value: `f/${fnumber}` },
		{ label: "Focal length", value: focalLength },
		{ label: "Copyright", value: "ERIC_ROVELL" }
	];
</script>

<Meta
	{title}
	meta={{
		description,
		keywords: keywords.join(","),
		language: lang
	}}
	openGraph={{
		title,
		description,
		locale: lang,
		type: "article",
		tag: keywords.join(","),
		section: "gallery",
		site_name: "Eric Rovell",
		author: "Eric Rovell",
		url: $webpage,
		"article:published_time": dateCreated,
		"article:modified_time": dateUpdated,
		image: `${og.src}.jpeg`
	}}
	twitter={{
		card: "summary_large_image",
		title,
		description,
		url: $webpage
	}}
/>

<main class={styles.container}>
	<section
		class="surface-2 {styles["image"]}"
		data-label="image"
	>
		<Image
			alt={description}
			height={fullsize.height}
			on:click={() => open = !open}
			src="{fullsize.src}.jpeg"
			sources="{[
				{
					srcset: `${fullsize.src}.webp`,
					type: "image/webp"
				},
				{
					srcset: `${fullsize.src}.jpeg`,
					type: "image/jpeg"
				}
			]}"
			style="--image-aspect-ratio: {fullsize.width} / {fullsize.height};"
			width={fullsize.width}
		/>
	</section>
	<div class="{styles.body}">
		<header class="{styles.header}">
			<h1>{title}</h1>
			<p>{description}</p>
			{#if dateUpdated}
				<p>{$t("message.updated")} <Datetime date="{dateUpdated}" /></p>
			{:else}
				<p>{$t("message.published")} <Datetime date="{dateCreated}" /></p>
			{/if}
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
					download="{title}"
					href="{fullsize.src}.jpeg"
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
		</header>
		<article class="{articleStyles.article}">
			<slot />
		</article>
		<aside class="{styles.metadata}">
			<dl>
				<dt>Date taken:</dt>
				<dd>
					<Datetime date={dateTaken} />
				</dd>
			</dl>
			{#each metadataList as { label, value }}
				<dl>
					<dt>{label}:</dt>
					<dd>{value ? value : "Unknown"}</dd>
				</dl>
			{/each}
		</aside>
		<aside class="{styles.keywords}">
			<ul>
				{#each keywords as keyword}
					<li class="surface-2">{keyword}</li>
				{/each}
			</ul>
		</aside>
		{#if $$slots.default}
			<ScrollToTop id="root" />
		{/if}
	</div>
</main>

<ImageFullscreen bind:open>
	<Image
		src="{fullsize.src}.jpeg"
		sources="{[
			{
				srcset: `${fullsize.src}.webp`,
				type: "image/webp"
			},
			{
				srcset: `${fullsize.src}.jpeg`,
				type: "image/jpeg"
			}
		]}"
		width={fullsize.width}
		height={fullsize.height}
		alt={description}
		draggable="false"
	/>
</ImageFullscreen>
