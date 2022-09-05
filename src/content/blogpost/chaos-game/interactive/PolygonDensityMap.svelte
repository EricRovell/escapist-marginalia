<script lang="ts">
	import { Range } from "@components";
	import { Polygon, type PolygonOrigin } from "../chaos";
	import styles from "./polygon-density-map.module.css";

	export let height = 375;
	export let n = 5;	
	export let r = 40;
	export let t: Record<string, string>;
	export let width = 375;

	$: origin = {	x: 0,	y: 0, angle: Math.PI * (n - 2) / n / 2 };

	const shiftOrigin = (origin: PolygonOrigin, coef: number, verticeIndex: number) => {
		const angle = origin.angle + 2 * Math.PI * verticeIndex / n;
		return {
			x: origin.x + coef * Math.cos(angle),
			y: origin.x + coef * Math.sin(angle),
			angle: origin.angle
		};
	};
</script>

<!--
	Shows the random points "density-map".
	Explains why the `square` Chaos Game is not fractal,
	and hints where how the fractal pattern build from the polygon itself. 
-->
<section class="wide">
	<h3>{t["title"]}</h3>
	<svg class="{styles.illustration}" viewBox="-{width / 2} -{height / 2} {width} {height}">
		<polygon
			class="{styles.outer}"
			points="{new Polygon(n, r, origin).points}"
		/>
		{#each { length: n } as _, i}
			<polygon
				class="{styles.inner}"
				points="{new Polygon(n, r / 2, shiftOrigin(origin, 0.5 * r, i)).points}"
			/>
		{/each}
		{#each { length: n } as _, i}
			<polygon
				class="{styles.outer}"
				points="{new Polygon(n, r, shiftOrigin(origin, 3.5 * r, i)).points}"
			/>
			<polygon
				class="{styles.inner}"
				points="{new Polygon(n, r / 2, shiftOrigin(origin, 4 * r, i)).points}"
			/>
		{/each}
	</svg>
	<form class="{styles.form}" on:submit|preventDefault>
		<Range bind:value={n} min={3} max={9}>
			{t["number-of-sides"]}
		</Range>
	</form>
</section>
