<script lang="ts">
	import { getContext } from "svelte";
	import { onDestroy } from "svelte";
	import { Button, InputRange, InputSelect } from "ui";
	import { clamp } from "utils/math";
	import { QuadTree, Circle, Rectangle } from "quadtree";

	import { QuadTreeGrid } from "../../components";
	import { getBoundaries, getRandomPoints } from "../../utils";
	import styles from "./quadtree-query.module.css";

	let element: SVGElement;
	let points = [];
	let pointsQuery = [];
	let quadtree = new QuadTree(4, new Rectangle(0, 0, 1000, 1000));
	let bounds = [];

	let rect = false;
	//let show = false;

	let width = 300;
	let height = 200;
	let x = 500;
	let y = 500;
	let r = 150;
	let pointsSize = 5;

	let draggable = false;

	const t = getContext<Record<string, string>>("t");

	const handlePointerEnter = () => {
		element.addEventListener("pointermove", handlePointerMove);
		element.style.setProperty("cursor", "move");
		//show = true;
	};

	const handlePointerDown = () => {
		draggable = true;
	};

	const handlePointerUp = () => {
		draggable = false;
	};

	const handlePointerLeave = () => {
		element.removeEventListener("pointermove", handlePointerMove);
		element.style.removeProperty("cursor");
		//show = false;
	};

	const handlePointerMove = (e: PointerEvent) => {
		if (!draggable) {
			return;
		}

		// @ts-expect-error: it works
		let point = DOMPoint.fromPoint(element);
		point.x = e.clientX;
		point.y = e.clientY;
		// @ts-expect-error: it works
		point = point.matrixTransform(element.getScreenCTM().inverse());

		if (rect) {
			x = clamp(point.x - width / 2, 0, 1000 - width);
			y = clamp(point.y - height / 2, 0, 1000 - height);
		} else {
			x = clamp(point.x, 0, 1000 + 2 * r);
			y = clamp(point.y, 0, 1000 + 2 * r);
		}

		const boundary = rect
			? new Rectangle(x, y, width, height)
			: new Circle(x, y, r);

		pointsQuery = quadtree.query(boundary);
	};

	const handleRandomPlacement = () => {
		points = [];
		bounds = [];
		quadtree.clear();
		const items = [];

		for (const point of getRandomPoints(100, 1000, 1000, 2 * pointsSize)) {
			items.push(point);
			quadtree.insert(point);
		}

		points = items;
		bounds = getBoundaries(quadtree);
	};

	handleRandomPlacement();

	onDestroy(() => {
		element && handlePointerLeave();
	});
</script>

<section class="interactive wide {styles.wrapper}">
	<h3>
		{t["title:query"]}
	</h3>
	<QuadTreeGrid
		{bounds}
		height="{1000}"
		{points}
		{pointsSize}
		{pointsQuery}
		width="{1000}"
	>
		<g
			bind:this="{element}"
			class="{styles.boundary}"
			stroke="var(--surface-1)"
			stroke-width="5px"
			stroke-opacity="0.5"
			fill="rgb(0 0 0 / 0.15)"
			on:pointerenter="{handlePointerEnter}"
			on:pointerleave="{handlePointerLeave}"
			on:pointerdown="{handlePointerDown}"
			on:pointerup="{handlePointerUp}"
		>
			{#if rect}
				<rect x="{x}" y="{y}" {height} {width} />
			{:else}
				<circle cx="{x}" cy="{y}" {r} />
			{/if}
		</g>
	</QuadTreeGrid>
	<form on:submit|preventDefault class="{styles.form}">
		<InputSelect
			name="quadtree-boundary-shape"
			options="{[
				{ label: t["rect"], value: "rect", selected: rect === true },
				{ label: t["circle"], value: "circle", selected: rect === false }
			]}"
			on:change="{e => {
				rect = e.target.value === "rect";
			}}"
		>
			{t["boundary"]}
		</InputSelect>
		{#if rect}
			<InputRange
				bind:value="{width}"
				min="{50}"
				max="{500}"
				output
			>
				{t["width"]}
			</InputRange>
			<InputRange
				bind:value="{height}"
				min="{50}"
				max="{500}"
				output
			>
				{t["height"]}
			</InputRange>
		{:else}
			<InputRange
				bind:value="{r}"
				min="{50}"
				max="{500}"
				output
			>
				{t["radius"]}
			</InputRange>
		{/if}
		<Button on:click="{handleRandomPlacement}">
			{t["add-100"]}
		</Button>
	</form>
</section>
