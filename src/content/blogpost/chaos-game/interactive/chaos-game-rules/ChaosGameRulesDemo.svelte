<script lang="ts">
	import { Button, Switch } from "@components";
	import { Chaos, Polygon } from "../../chaos";
	import type { Coords, Move, PolygonOrigin } from "../../chaos";
	import styles from "./chaos-game-rules-demo.module.css";

	export let height = 350;
	export let limit = 3000;
	export let polygon = 3;
	export let scale = 350;
	export let strokeWidth = 0.5;
	export let showLines = true;
	export let showPoints = true;
	export let origin: Partial<PolygonOrigin> = undefined;
	export let t: Record<string, string>;
	export let width = 350;
	export let step = { value: 0.5, factor: true };

	const poly = new Polygon(polygon, scale / 2, origin);
	const chaos = new Chaos(poly, { step });

	let points: Move[] = [];

	let randomlyChosenVertex: Coords;

	const handleNextMove = (steps = 1) => {
		const coords = chaos.moves(steps);
		points = [ ...points, ...coords ].slice(-limit);
		randomlyChosenVertex = points.at(-1).verticeCoords;
	};

	const handleReset = () => {
		points = [];
	};

	const handleLinesVisibility = () => {
		showLines = !showLines;
	};

	const handlePointsVisibility = () => {
		showPoints = !showPoints;
	};
</script>

<!--
	Simplistic vector based "Chaos Game" for rules demonstration purposes.
-->
<section class="wide interactive">
	<h3>{t["title"]}</h3>
	<article class="{styles.root}">
		<aside class="{styles.steps}">
			<span>
				{t["step-count"]}: <output>{points.length}</output>
			</span>
		</aside>
		<section class="{styles.polygon}">
			<svg viewBox="-{width / 2} -{height / 2} {width} {height}">
				<polygon
					points="{poly.points}"
					stroke-width="{strokeWidth}px"
					stroke="white"
					opacity="0.5"
					fill="none"
				/>
				<g style="opacity: {showPoints ? 1 : 0};">
					{#each points as { position }}
						<circle cx="{position.x}" cy="{position.y}" r="0.75" fill="var(--color-blue-500)" />
					{/each}
				</g>
				{#if points.length > 1}
					<g style="opacity: {showLines ? 1 : 0};">
						<!-- Show current randomly chosen vertex -->
						<circle cx="{randomlyChosenVertex.x}" cy="{randomlyChosenVertex.y}" r="1" fill="white" />
						<!-- Render the "walking" path -->
						{#each { length: points.length - 1 } as _, i}
							<line
								x1="{points[i].position.x}"
								y1="{points[i].position.y}"
								x2="{points[i + 1].position.x}"
								y2="{points[i + 1].position.y}"
								opacity="{i === points.length - 2 ? 0.75 : 0.15}"
								stroke-width="{i === points.length - 2 ? 0.5 : 0.35}"
								stroke="lightblue"
							/>
						{/each}
						<!-- Render line connecting the last and penultimate positions -->
						<line
							x1="{points.at(-1).position.x}"
							y1="{points.at(-1).position.y}"
							x2="{randomlyChosenVertex.x}"
							y2="{randomlyChosenVertex.y}"
							opacity="0.15"
							stroke-width="0.35"
							stroke="white"
						/>
					</g>
				{/if}
			</svg>
		</section>
		<form on:submit|preventDefault class="{styles.form}">
			<fieldset class="{styles["controls-render"]}">
				<Switch on:change={handleLinesVisibility} checked={showLines}>
					{t["show-paths"]}
				</Switch>
				<Switch on:change={handlePointsVisibility} checked={showPoints}>
					{t["show-points"]}
				</Switch>
			</fieldset>
			<fieldset class="{styles["controls-actions"]}">
				<Button on:click={() => handleNextMove()} disabled={points.length >= limit}>
					{t["make-move"]}
				</Button>
				<Button on:click={() => handleNextMove(100)} disabled={points.length >= limit}>
					{t["make-move-100"]}
				</Button>
				<Button on:click={handleReset} disabled={points.length === 0}>
					{t["reset"]}
				</Button>
			</fieldset>
		</form>
	</article>
</section>
