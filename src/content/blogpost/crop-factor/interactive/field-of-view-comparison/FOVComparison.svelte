<script lang="ts">
	import { getContext } from "svelte";
	import { Range } from "@components";
	import styles from "./fov-comparison.module.css";

	const t = getContext<Record<string, string>>("t")["field-of-view-comparison"];

	const CENTER = {
		x: 251.51,
		y: 180.15
	};

	const IMAGE_SRC = "/img/20210502192806.og.jpeg";
	const IMAGE_SIZE = 210;

	let sensorScale = 35;
	const sensorScaleMax = 35;

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
	<h3>
		{t["title"]}
	</h3>
	<svg class="{styles.root}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425 350">
		<image
			class="{styles.projection}"
			x="{CENTER.x - IMAGE_SIZE / 2}"
			y="{CENTER.y - IMAGE_SIZE / 2}"
			width="{IMAGE_SIZE}"
			height="{IMAGE_SIZE}"
			xlink:href="{IMAGE_SRC}"
			style="clip-path: circle(50% at 50% 50%); filter: blur(3px); opacity: 75%"
		/>
		<image
			class="{styles.sensor}"
			x="{CENTER.x - IMAGE_SIZE / 2}"
			y="{CENTER.y - IMAGE_SIZE / 2}"
			width="{IMAGE_SIZE}"
			height="{IMAGE_SIZE}"
			xlink:href="{IMAGE_SRC}"
			style="clip-path: inset({42 + (sensorScaleMax - sensorScale)}px {25 + 1.15 * (sensorScaleMax - sensorScale)}px)"
		/>
		<rect
			class="{styles.fullframe}"
			x="172.49"
			y="117.6"
			width="158.04"
			height="125.11"
			rx="2.3"
			ry="2.3"
		/>
		<path
			class="{styles.camera}"
			d="m367.09,47.87h-31.29c-6.34-27.41-30.89-47.87-60.24-47.87h-52.09c-29.35,0-53.91,20.46-60.24,47.87h-75.46c-4.94-5.26-14.26-8.81-24.96-8.81-13.55,0-24.89,5.69-27.92,13.36C14.38,61.12,0,81.44,0,105.12v156.27c0,31.61,25.64,57.25,57.26,57.25h140.9c-54.35-21.23-92.84-74.1-92.84-135.96,0-80.58,65.33-145.91,145.92-145.91s145.91,65.33,145.91,145.91c0,61.86-38.49,114.72-92.82,135.96h62.76c31.62,0,57.25-25.64,57.25-57.25V105.12c0-31.62-25.63-57.25-57.25-57.25Zm-304.28-1.45c8.25,0,14.94,3.8,14.94,8.47s-6.69,8.46-14.94,8.46-14.93-3.8-14.93-8.46,6.68-8.47,14.93-8.47Zm.01,28.8c-14.65,0-26.53-6-26.53-13.4,0-.6.08-1.18.24-1.76,1.7,6.57,12.82,11.64,26.29,11.64s24.58-5.07,26.28-11.64c.16.58.24,1.16.24,1.76,0,7.4-11.88,13.4-26.52,13.4Zm43.18,33.22c-8.25,0-14.93-6.67-14.93-14.92s6.68-14.94,14.93-14.94,14.94,6.69,14.94,14.94-6.69,14.92-14.94,14.92ZM251.24,44.42c-76.36,0-138.26,61.91-138.26,138.26,0,67.74,48.71,124.1,113.02,135.96h50.48c64.3-11.86,113.01-68.22,113.01-135.96,0-76.35-61.9-138.26-138.25-138.26Zm0,238.61c-56.69,0-102.64-45.97-102.64-102.64s45.95-102.65,102.64-102.65,102.64,45.96,102.64,102.65-45.96,102.64-102.64,102.64Z"
		/>
	</svg>
	<form on:submit|preventDefault>
		<Range
			bind:value="{sensorScale}"
			min="{1}"
			max="{sensorScaleMax}"
			step="{1}"
		>
			{t["size"]}
		</Range>
	</form>
</section>
