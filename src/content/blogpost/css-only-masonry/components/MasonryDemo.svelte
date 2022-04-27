<script context="module" lang="ts">
	import { randInt } from "@utils/random";
</script>

<script lang="ts">
	import styles from "./styles.module.css";

	export let items = 20;
	export let scale = 40;
</script>

<!--
	@component

	Demo for `Masonry-like` layout built on `CSS Grid` with `dense` flow.
-->
<section class="{styles.wide} wide {styles.masonry}">
	<form>
		<label>
			<span>
				Items: <output>{items}</output>
			</span>
			<input type="range" bind:value={items} min={5} max={40}>
		</label>
		<label>
			<span>
				Scale: <output>{scale}</output> px
			</span>
			<input type="range" bind:value={scale} min={40} max={200}>
		</label>
	</form>
	<div class="custom-scroll {styles.wrapper}">
		<ul style:--masonry-item-size="{scale}px">
			{#each { length: items } as _}
				{@const row = randInt(1, 4)}
				{@const column = randInt(1, 4)}
				<li
					class="{styles["grid-item"]}"
					style:--masonry-item-row={row}
					style:--masonry-item-column={column}
				>
					{row} / {column}
				</li>
			{/each}
		</ul>
	</div>
</section>