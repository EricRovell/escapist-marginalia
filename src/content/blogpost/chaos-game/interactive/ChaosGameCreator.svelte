<script lang="ts">
	import { Button, Range, Switch } from "@components";
	import { Canvas, CanvasLayer } from "@components";
	import { Chaos, Polygon } from "../chaos";
	import styles from "./chaos-game-creator.module.css";
	import type { PolygonOrigin } from "../chaos";
	import type { SvelteComponent } from "svelte";

	export let polygon = 3;
	export let origin: PolygonOrigin = undefined;
	export let step = { value: 0.5, factor: true };
	export let pointSize = 1;
	export let scale = 800;
	export let distances = [];
	export let t: Record<string, string>;

	let canvas: SvelteComponent;

	$: chaos = new Chaos(new Polygon(polygon, scale, origin), {
		step,
		distances
	});

	let moves = [];

	const handleClick = (value = 1) => {
		moves = chaos.moves(value);
	};

	const handleReset = () => {
		canvas?.clear();
	};
</script>

<section class="wide">
	<h3>{t.title}</h3>
	<article class="{styles.wrapper}">
		<figure class="{styles.figure}">
			<Canvas bind:this={canvas} width="{1800}" height="{1800}">
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
		<form on:submit|preventDefault class="{styles.form}">
			<fieldset>
				<legend>{t.polygon}</legend>
				<Range bind:value="{polygon}" min="{3}" max="{16}" output>
					{t.sides}
				</Range>
				<Range bind:value="{scale}" min="{0}" max="{1200}" output>
					{t.scale}
				</Range>
			</fieldset>
			<fieldset>
				<legend>{t.step}</legend>
				<Switch bind:checked="{step.factor}">
					{t.factor}
				</Switch>
				<Range
					bind:value="{step.value}"
					min="{0}"
					max="{step.factor ? 1 : 1200}"
					step="{step.factor ? 0.01 : 1}"
					output
				>
					{t.value}
				</Range>
			</fieldset>
			<fieldset class="points">
				<legend>{t.points}</legend>
				<div class="{styles["button-group"]}">
					<Button on:click={() => handleClick(1)}>+1</Button>
					<Button on:click={() => handleClick(100)}>+100</Button>
					<Button on:click={() => handleClick(500)}>+500</Button>
					<Button on:click={() => handleClick(1000)}>+1000</Button>
					<Button on:click={() => handleClick(5000)}>+5000</Button>
				</div>
			</fieldset>
			<Button on:click={handleReset}>{t.clear}</Button>
		</form>
	</article>
</section>
