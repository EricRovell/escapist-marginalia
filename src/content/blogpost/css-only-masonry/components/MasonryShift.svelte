<script context="module" lang="ts">
	interface Item {
		h: number;
		d?: number;
	}
</script>

<script lang="ts">
	import { Switch } from "@components";
	import styles from "./styles.module.css";

	export let masonry = false;

	const items: Array<Item[]> = [
		[
			{ h: 45 },
			{ h: 30 },
			{ h: 75 },
			{ h: 50 }
		],
		[
			{ h: 25, d: 30 },
			{ h: 50, d: 45 },
			{ h: 40, d: 0 },
			{ h: 70, d: 25 }
		],
		[
			{ h: 30, d: 75 },
			{ h: 40, d: 65 },
			{ h: 50, d: 30 },
			{ h: 20, d: 25 }
		]
	];
</script>

<!--
	@component

	Demo for `Grid` -> `Masonry` transformation.
-->
<section class="{styles.wide} wide {styles["shift-demo"]}">
	<form class="controls">
		<Switch bind:checked={masonry}>
			Masonry
		</Switch>
	</form>
	<ul>
		{#each items as row}
			{#each row as { h, d = 0}}
				{@const shift = masonry ? d : 0}
				<li
					class="{styles["grid-item"]}"
					style:height="{h}px"
					style:transform="translateY(-{shift}px)"
				/>
			{/each}
		{/each}
	</ul>
</section>