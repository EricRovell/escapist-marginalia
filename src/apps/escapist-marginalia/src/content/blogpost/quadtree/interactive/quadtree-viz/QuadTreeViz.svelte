<script lang="ts">
	import { getContext } from "svelte";
	import { Button } from "@components";
	import { QuadTreeGrid } from "../../components";
	import { QuadTree, Rectangle } from "@utils/quad-tree";
	import { getBoundaries, getRandomPoints } from "../../utils";
	import styles from "./quadtree-viz.module.css";

	let element: SVGElement;
	let points = [];
	let pointsSize = 5;
	let pointsLimit = 200;
	let quadtree = new QuadTree(4, new Rectangle(0, 0, 1000, 1000));
	let bounds = [];

	const t = getContext<Record<string, string>>("t");

	const handleClick = (e: PointerEvent) => {
		// @ts-expect-error: it works
		let point = DOMPoint.fromPoint(element);
		point.x = e.clientX;
		point.y = e.clientY;
		// @ts-expect-error: it works
		point = point.matrixTransform(element.getScreenCTM().inverse());

		points = [ ...points, {
			x: point.x,
			y: point.y
		} ].slice(-pointsLimit);

		quadtree.insert({
			x: point.x,
			y: point.y
		});

		bounds = getBoundaries(quadtree);
	};

	const handleReset = () => {
		points = [];
		bounds = [];
		quadtree.clear();
	};

	const handleRandomPlacement = () => {
		handleReset();
		const items = [];

		for (const point of getRandomPoints(100, 1000, 1000, 2 * pointsSize)) {
			items.push(point);
			quadtree.insert(point);
		}

		points = items;
		bounds = getBoundaries(quadtree);
	};

	$: show = points.length > 0;
</script>

<section class="interactive wide">
	<h3>
		{t["title:viz"]}
	</h3>
	<div class="{styles.wrapper}" class:show>
		<QuadTreeGrid
			bind:element="{element}"
			{bounds}
			height="{1000}"
			{points}
			{pointsSize}
			width="{1000}"
			on:pointerdown="{handleClick}"
		/>
		<p>
			{t["touch-to-add"]}
		</p>
	</div>
	<form on:submit|preventDefault class="{styles.form}">
		<Button on:click="{handleRandomPlacement}">
			{t["add-100"]}
		</Button>
		<Button on:click="{handleReset}">
			{t["reset"]}
		</Button>
	</form>
</section>
