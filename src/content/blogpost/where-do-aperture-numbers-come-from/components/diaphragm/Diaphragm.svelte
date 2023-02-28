<script>
	import { createPolygon } from "@content/sketch/chaos-game/lib/polygon";
	import styles from "./diaphragm.module.css";

	export let angle = 45;
	export let blades = 9;
	export let scale = 50;

	let maskID = Math.random().toString().slice(2, 8);
</script>

<!--
	Iris Diaphragm Illustration
-->
<svg class="{styles.illustration}" viewBox="-{scale / 2} -{scale / 2} {scale} {scale}">
	<defs>
		<mask id="{maskID}">
			<circle fill="white" cx="0" cy="0" r="{scale / 2}" />
			<circle cx="0" cy="0" r="{(85 - angle) / 2.5}" fill="black" />
		</mask>
	</defs>
	<circle cx="0" cy="0" r="{scale / 2}" mask="url(#{maskID})" />
	{#each createPolygon(blades, 23).vertices as { x, y }, i}
		<path
			stroke-width="0.1"
			transform="translate({x} {y}) rotate({angle + 360 / blades * i + 210} 1.54 19.65)"
			d="M21-19.43a.74.74,0,0,0-.21,0,38.14,38.14,0,0,0-6.81.81,36.38,36.38,0,0,0-5.88,1.73A22.86,22.86,0,0,0,4.07-15,3.68,3.68,0,0,0,2.2-11.69c0,1.27.12,2.54.2,3.8A6.39,6.39,0,0,1,2-4.8,24.17,24.17,0,0,1,.46-2.61c-.22.29-.92,1.15-1.1,1.37L-1.39-.11a1.44,1.44,0,0,0,0,1.26,1.4,1.4,0,0,0,1.93.64c.32-.15.62-.34.93-.52C2.86.45,4.23-.36,5.59-1.19A3.56,3.56,0,0,0,7.41-3.94a14.35,14.35,0,0,1,.73-3.5A15.13,15.13,0,0,1,13-14.13a15.66,15.66,0,0,1,2.42-1.61,15.08,15.08,0,0,1,4.12-1.45c.48-.1,1-.24,1.43-.38a1.33,1.33,0,0,0,.83-.67C22.13-18.82,21.92-19.36,21-19.43ZM.13,1.12A.77.77,0,0,1-.64.35.76.76,0,0,1,.13-.41.76.76,0,0,1,.89.35.77.77,0,0,1,.13,1.12Z"
		/>
	{/each}
</svg>
