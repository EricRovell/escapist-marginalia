<script lang="ts">
	import { t } from "@core/i18n";
	import { webpageRoot, webpage } from "@paths";
	import { Button, Icon, Image, Link, Meta, ImageFullscreen } from "@components";
	import { iconShare, iconDownload, iconFullscreen } from "$lib/components/icons/default";
	import { share } from "@utils/helpers";
	import type { PageData } from "./$types";
	import styles from "./id.module.css";

	export let data: PageData;

	let open = false;

	const handleShare = async () => {
		const files = [];

		try {
			const request = await fetch(data.src);
			const blob = await request.blob();

			files.push(
				new File([ blob ], `${data.title}.webp`, {
					type: blob.type
				})
			);
		} catch(error) {
			console.error(`Could not load the image: ${error.message}`);
		}

		await share({
			files,
			url: $webpage,
			title: data.title,
			text: data.description
		});
	};
</script>

<Meta
	title={data.title}
	meta={{
		description: data.description,
		keywords: data.keywords.toString()
	}}
	openGraph={{
		title: data.title,
		description: data.description,
		url: $webpage,
		image: `${$webpageRoot}${data.thumb.cover}`
	}}
	twitter={{
		card: "summary",
		title: data.title,
		description: data.description,
		url: $webpage
	}}
/>

<main class={styles.container}>
	<section class="surface-2 {styles["image"]}" label="img">
		<Image
			src={data.src}
			width={data.width}
			height={data.height}
			alt={data.description}
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
				download="{data.title}"
				href="{data.src}"
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
		{data.title}
	</h1>
	<div class="{styles.metadata}">
		<section>
			<dl aria-label="camera">
				<dt>Camera</dt>
				<dd>{data.camera}</dd>
				<dt>Lens</dt>
				<dd>{data.lens}</dd>
			</dl>
			<dl aria-label="parameters">
				<dt>Aperture</dt>
				<dd>{data.aperture}</dd>
				<dt>ISO</dt>
				<dd>{data.iso}</dd>
				<dt>Shutter Speed</dt>
				<dd>{data.shutterSpeed}</dd>
				<dt>Focal Length</dt>
				<dd>{data.focalLength}</dd>
			</dl>
		</section>
		<section>
			<dl aria-label="date">
				<dt>Taken on</dt>
				<dd>{data.date}</dd>
				<dt>Copyright</dt>
				<dd>ERIC_ROVELL</dd>
			</dl>
			<div class="{styles.keywords}">
				<h3>Keywords</h3>
				<ul>
					{#each data.keywords as keyword}
						<li class="surface-2">{keyword}</li>
					{/each}
				</ul>
			</div>
		</section>
	</div>
</main>

<ImageFullscreen bind:open>
	<Image
		src={data.src}
		width={data.width}
		height={data.height}
		alt={data.description}
	/>
</ImageFullscreen>
