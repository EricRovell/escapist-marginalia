<script context="module" lang="ts">
	import { randInt } from "@utils/random";
</script>

<script lang="ts">
	import { Button, Range } from "@components";
	import { cell } from "../../components/cell.module.css";
	import styles from "./masonry-demo.module.css";

	export let items = 20;
	export let scale = 40;
	export let t: Record<string, string>;

	let minItems = 5;
	let maxItems = 25;
	let minScale = 25;
	let maxScale = 50;

	const handleClick = () => {
		items = randInt(minItems, maxItems);
		scale = randInt(minScale, maxScale);
	};
</script>

<!--
	@component

	Demo for `Masonry-like` layout built on `CSS Grid` with `dense` flow.
-->
<section class="wide interactive {styles.wrapper}">
	<h3>{t["title"]}</h3>
	<form class="{styles.form}" on:submit|preventDefault>
		<Range bind:value={items} min={minItems} max={maxItems} output>
			{t["items"]}
		</Range>
		<Range bind:value={scale} min={minScale} max={maxScale}>
			{t["scale"]}
		</Range>
		<Button on:click={handleClick}>
			Randomize
		</Button>
	</form>
	<ul
		class="{styles.masonry}"
		style:--masonry-scale="{scale}px"
	>
		{#each { length: items } as _}
			{@const row = randInt(1, 4)}
			{@const column = randInt(1, 4)}
			<li
				class="{cell}"
				style:--masonry-item-row={row}
				style:--masonry-item-column={column}
			>
				{row} / {column}
			</li>
		{/each}
	</ul>
</section>
