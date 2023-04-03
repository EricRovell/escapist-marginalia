<script lang="ts">
	import { onDestroy } from "svelte";
	import { uniqueID } from "$lib/stores/unique-id";
	import styles from "./lens-projection.module.css";

	export let cropFactor = 1;
	export let height = 24;
	export let width = 36;
	export let imageSrc = "/img/blogpost-crop-factor-comparison.jpg";
	export let imageFocalLength = 16;
	export let focalLength = imageFocalLength;

	const maskID = uniqueID.get();

	const calcRadius = (width: number, height: number, cropFactor: number): number => {
		return ((width ** 2 + height ** 2) ** 0.5) * cropFactor / 2;
	};

	let r = calcRadius(width, height, cropFactor);
	let d = 2 * r;
	let scale = focalLength / imageFocalLength;

	onDestroy(() => {
		uniqueID.remove(maskID);
	});

	$: r = calcRadius(width, height, cropFactor);
	$: d = 2 * r;
	$: scale = focalLength / imageFocalLength;
</script>

<svg
	class="{styles.projection}"
	viewBox="-{r} -{r} {d} {d}"
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<mask id="{maskID}">
			<rect
				class="{styles.mask}"
				x="{-width / 2}"
				y="{-height / 2}"
				{width}
				{height}
			/>
		</mask>
	</defs>
	<image
		x="{-r * scale}"
		y="{-r * scale}"
		width="{d * scale}"
		height="{d * scale}"
		xlink:href="{imageSrc}"
		style="filter: blur({d / 50 * scale}px);"
		preserveAspectRatio="xMidYMid slice"
	/>
	<image
		x="{-r * scale}"
		y="{-r * scale}"
		width="{d * scale}"
		height="{d * scale}"
		xlink:href="{imageSrc}"
		mask="url(#{maskID})"
		preserveAspectRatio="xMidYMid slice"
	/>
	<rect
		class="{styles.sensor}"
		x="{-width / 2}"
		y="{-height / 2}"
		{width}
		{height}
	/>
</svg>
