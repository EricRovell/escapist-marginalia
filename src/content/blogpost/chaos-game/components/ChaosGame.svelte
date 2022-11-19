<script lang="ts">
	import { Canvas, CanvasLayer } from "@components";
	import { Chaos, Point, Polygon } from "../chaos";
	import styles from "./chaos-game.module.css";
	import type { PolygonOrigin, ChaosOptions } from "../chaos/chaos.types";

	export let distances = [];
	export let height = 450;
	export let origin: PolygonOrigin = undefined;
	export let palette: ChaosOptions["palette"] | undefined = undefined;
	export let points = 2500;
	export let pointSize = 1;
	export let polygon = 3;
	export let scale = 250;
	export let step = { value: 0.5, factor: true };
	export let style: string | undefined = undefined;
	export let width = 450;
</script>

<figure class="{styles.figure}" {style}>
	<Canvas {width} {height} autoclear>
		<CanvasLayer
			id="chaos-game"
			setup="{({ context, height, width }) => {
				context.translate(width / 2, height / 2);
			}}"
			draw="{({ context }) => {
				const point = new Point({ x: 0, y: 0 }, {
					size: pointSize
				});
				const poly = new Polygon(polygon, scale, origin);
				const chaos = new Chaos(poly, { palette, step, distances });

				for (let i = 0; i <= points; i++) {
					const { position, color } = chaos.move();
					context.fillStyle = color;
					point.coords = position;
					point.render(context);
				}
			}}"
		/>
	</Canvas>
	{#if $$slots.default}
		<figcaption>
			<slot />
		</figcaption>
	{/if}
</figure>
