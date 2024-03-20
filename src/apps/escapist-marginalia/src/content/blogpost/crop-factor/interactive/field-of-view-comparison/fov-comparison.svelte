<script lang="ts">
	import { getContext } from "svelte";
	import { InputRange } from "ui";

	import { LensProjection } from "../../components";
	import type { Translation } from "../../translations/types";
	import styles from "./fov-comparison.module.css";

	const t = getContext<Translation>("t");

	let cropFactor = 1;

	/**
	 * Lens rect coords:
	 * {
	 * 	x: 148.6,
	 * 	y: 77.78,
	 * 	width: 205.28,
	 * 	height: 205.28
	 * }
	 * 
	 * Lens circle coords:
	 * {
	 * 	x: 251.51,
	 * 	y: 180.15,
	 * 	r: 102.37
	 * }
	*/
</script>

<section class="interactive wide">
	<h3>{t.TITLE_FIELD_OF_VIEW_COMPARISON}</h3>
	<svg class="{styles.root}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425 350">
		<path
			class="{styles.camera}"
			d="m367.09,47.87h-31.29c-6.34-27.41-30.89-47.87-60.24-47.87h-52.09c-29.35,0-53.91,20.46-60.24,47.87h-75.46c-4.94-5.26-14.26-8.81-24.96-8.81-13.55,0-24.89,5.69-27.92,13.36C14.38,61.12,0,81.44,0,105.12v156.27c0,31.61,25.64,57.25,57.26,57.25h140.9c-54.35-21.23-92.84-74.1-92.84-135.96,0-80.58,65.33-145.91,145.92-145.91s145.91,65.33,145.91,145.91c0,61.86-38.49,114.72-92.82,135.96h62.76c31.62,0,57.25-25.64,57.25-57.25V105.12c0-31.62-25.63-57.25-57.25-57.25Zm-304.28-1.45c8.25,0,14.94,3.8,14.94,8.47s-6.69,8.46-14.94,8.46-14.93-3.8-14.93-8.46,6.68-8.47,14.93-8.47Zm.01,28.8c-14.65,0-26.53-6-26.53-13.4,0-.6.08-1.18.24-1.76,1.7,6.57,12.82,11.64,26.29,11.64s24.58-5.07,26.28-11.64c.16.58.24,1.16.24,1.76,0,7.4-11.88,13.4-26.52,13.4Zm43.18,33.22c-8.25,0-14.93-6.67-14.93-14.92s6.68-14.94,14.93-14.94,14.94,6.69,14.94,14.94-6.69,14.92-14.94,14.92ZM251.24,44.42c-76.36,0-138.26,61.91-138.26,138.26,0,67.74,48.71,124.1,113.02,135.96h50.48c64.3-11.86,113.01-68.22,113.01-135.96,0-76.35-61.9-138.26-138.25-138.26Zm0,238.61c-56.69,0-102.64-45.97-102.64-102.64s45.95-102.65,102.64-102.65,102.64,45.96,102.64,102.65-45.96,102.64-102.64,102.64Z"
		/>
		<g style="transform: scale(0.59) translate(67px, 10px); transform-origin: center;">
			<LensProjection bind:cropFactor />
		</g>
	</svg>
	<form on:submit|preventDefault>
		<InputRange
			bind:value="{cropFactor}"
			min="{1}"
			max="{3}"
			step="{0.1}"
		>
			{t.SIZE}
		</InputRange>
	</form>
</section>
