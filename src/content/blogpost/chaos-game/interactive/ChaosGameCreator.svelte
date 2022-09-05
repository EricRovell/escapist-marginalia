<script lang="ts">
	import { Button } from "@components";
	import { Canvas, CanvasLayer } from "@components";
	import { Chaos, Polygon } from "../chaos";
	import type { PolygonOrigin } from "../chaos";
	import type { SvelteComponent } from "svelte";

	export let polygon = 3;
	export let origin: PolygonOrigin = undefined;
	export let step = { value: 0.5, factor: true };
	//export let pointColor = "rgb(255 135 0 / 0.25)";
	export let pointSize = 1;
	export let scale = 300;
	export let distances = [];
	export let t: Record<string, string>;

	let canvas: SvelteComponent;

	const chaos = new Chaos(new Polygon(polygon, scale, { y: 60 }), {
		step,
		distances
	});

	let moves = chaos.moves(2500);

	const handleClick = (value = 1) => {
		moves = chaos.moves(value);
	};

	const handleReset = () => {
		canvas?.clear();
	};
</script>

<section class="wide">
	<h3>{t.title}</h3>
	<div>
		<figure>
			<Canvas bind:this={canvas} width="{640}" height="{640}">
				<CanvasLayer
					id="chaos"
					setup="{({ context, height, width }) => {
						context.translate(width / 2, height / 2);
					}}"
					draw="{({ context }) => {
						for (const { position, color } of moves) {
							context.fillStyle = color;
							context.beginPath();
							context.arc(position.x, position.y, pointSize, 0, 2 * Math.PI, false);
							context.closePath();
							context.fill();
						}
					}}"
				/>
			</Canvas>
		</figure>
		<fieldset>
			<Button on:click={() => handleClick(1)}>+1</Button>
			<Button on:click={() => handleClick(10)}>+10</Button>
			<Button on:click={() => handleClick(100)}>+100</Button>
			<Button on:click={() => handleClick(500)}>+500</Button>
			<Button on:click={() => handleClick(1000)}>+1000</Button>
			<Button on:click={handleReset}>{t.reset}</Button>
		</fieldset>
	</div>
</section>

<style>
	div {
		display: grid;
		place-content: center;
		width: min(100% - var(--space-m), 640px);
	}

	figure {
		width: 100%;
	}

	section :global(canvas) {
		--canvas-bg: rgb(255 0 0 / 0.05);

		width: 350px;
		height: 350px;
	}

	fieldset {
		border: none;
	}

	fieldset :global(button) {
		font-size: var(--font-size-xs);
		padding: var(--space-m);
	}
</style>