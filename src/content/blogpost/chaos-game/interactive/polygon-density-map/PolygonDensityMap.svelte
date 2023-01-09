<script lang="ts">
	import { Range } from "@components";
	import { createPolygon } from "@content/sketch/chaos-game/index";
	import type { PolygonOrigin } from "@content/sketch/chaos-game/lib/chaos.types";
	import styles from "./polygon-density-map.module.css";

	export let height = 375;
	export let n = 5;
	export let r = 40;
	export let t: Record<string, string>;
	export let width = 375;

	$: origin = {	x: 0,	y: 0, angle: 0 };

	const shiftOrigin = (origin: PolygonOrigin, coef: number, verticeIndex: number) => {
		const angle = -Math.PI * (n - 2) / n / 2 + origin.angle + 2 * Math.PI * verticeIndex / n + Math.PI;
		return {
			x: origin.x + coef * Math.cos(angle),
			y: origin.x + coef * Math.sin(angle),
			angle: origin.angle
		};
	};

	const constructCoords = (n: number, r: number, origin: PolygonOrigin) => {
		return createPolygon(n, r, origin)
			.vertices
			.map(({ x, y }) => `${x},${y}`)
			.join(" ");
	};
</script>

<!--
	Shows the random points "density-map".
	Explains why the `square` Chaos Game is not fractal,
	and hints where how the fractal pattern build from the polygon itself.
-->
<section class="wide interactive">
	<h3>{t["title"]}</h3>
	<svg class="{styles.illustration}" viewBox="-{width / 2} -{height / 2} {width} {height}">
		<polygon
			class="{styles.outer}"
			points="{constructCoords(n, r, origin)}"
		/>
		{#each { length: n } as _, i}
			<polygon
				class="{styles.inner}"
				points="{constructCoords(n, r / 2, shiftOrigin(origin, 0.5 * r, i))}"
			/>
		{/each}
		{#each { length: n } as _, i}
			<polygon
				class="{styles.outer}"
				points="{constructCoords(n, r, shiftOrigin(origin, 3.5 * r, i))}"
			/>
			<polygon
				class="{styles.inner}"
				points="{constructCoords(n, r / 2, shiftOrigin(origin, 4 * r, i))}"
			/>
		{/each}
	</svg>
	<form class="{styles.form}" on:submit|preventDefault>
		<Range bind:value={n} min={3} max={9} output>
			{t["number-of-sides"]}
		</Range>
	</form>
</section>
