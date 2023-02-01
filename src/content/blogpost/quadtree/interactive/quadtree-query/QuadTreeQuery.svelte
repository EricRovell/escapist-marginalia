<script lang="ts">
	import { getContext } from "svelte";
	import { onDestroy } from "svelte";
	import { QuadTreeGrid } from "../../components";
	import { Button, InputSelect, Range } from "@components";
	import { QuadTree, Circle, Rectangle } from "@utils/quad-tree";
	import { clamp } from "@utils/helpers";
	import { getBoundaries, getRandomPoints } from "../../utils";
	import styles from "./quadtree-query.module.css";

	let element: SVGElement;
	let points = [];
	let pointsQuery = [];
	let quadtree = new QuadTree(4, new Rectangle(0, 0, 1000, 1000));
	let bounds = [];

	let rect = false;
	let show = false;

	let width = 300;
	let height = 200;
	let x = 0;
	let y = 0;
	let r = 150;
	let pointsSize = 5;

	const t = getContext<Record<string, string>>("t");

	const handlePointerEnter = () => {
		element && element.addEventListener("pointermove", handlePointerMove);
		element && element.style.setProperty("cursor", "move");
		show = true;
	};

	const handlePointerLeave = () => {
		element && element.removeEventListener("pointermove", handlePointerMove);
		element && element.style.removeProperty("cursor");
		show = false;
	};

	const handlePointerMove = (e: PointerEvent) => {
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

<section class="interactive wide">
	<h3>
		{t["title:query"]}
	</h3>
	<div class="{styles.wrapper}" class:show>
		<QuadTreeGrid
			bind:element="{element}"
			{bounds}
			height="{1000}"
			{points}
			{pointsSize}
			{pointsQuery}
			width="{1000}"
			on:pointerleave="{handlePointerLeave}"
			on:pointerenter="{handlePointerEnter}"
		>
			{#if show}
				{#if rect}
					<rect
						class="{styles.boundary}"
						x="{x}"
						y="{y}"
						{height}
						{width}
						stroke="var(--surface-1)"
						stroke-width="5px"
						stroke-opacity="0.5"
						fill="rgb(0 0 0 / 0.15)"
					/>
				{:else}
					<circle
						class="{styles.boundary}"
						cx="{x}"
						cy="{y}"
						{r}
						stroke="var(--surface-1)"
						stroke-width="5px"
						stroke-opacity="0.5"
						fill="rgb(0 0 0 / 0.15)"
					/>
				{/if}
			{/if}
		</QuadTreeGrid>
		<p>
			{t["point-over"]}
		</p>
	</div>
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
			<Range
				bind:value="{width}"
				min="{50}"
				max="{500}"
				output
			>
				{t["width"]}
			</Range>
			<Range
				bind:value="{height}"
				min="{50}"
				max="{500}"
				output
			>
				{t["height"]}
			</Range>
		{:else}
			<Range
				bind:value="{r}"
				min="{50}"
				max="{500}"
				output
			>
				{t["radius"]}
			</Range>
		{/if}
		<Button on:click="{handleRandomPlacement}">
			{t["add-100"]}
		</Button>
	</form>
</section>
