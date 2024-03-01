<script context="module" lang="ts">
	interface Item {
		h: number;
		d?: number;
	}
</script>

<script lang="ts">
	import { getContext } from "svelte";
	import { Switch } from "@components";
	import { cell } from "../../components/cell.module.css";
	import styles from "./masonry-difference.module.css";

	export let masonry = false;

	const t = getContext<Record<string, string>>("t")["grid-into-masonry"];

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
<section class="wide interactive {styles["shift-demo"]}">
	<h3>{t["title"]}</h3>
	<ul>
		{#each items as row}
			{#each row as { h, d = 0}}
				{@const shift = masonry ? d : 0}
				<li
					class="{cell}"
					style:height="{h}px"
					style:transform="translateY(-{shift}px)"
				/>
			{/each}
		{/each}
	</ul>
	<form>
		<Switch bind:checked={masonry}>
			{t["masonry"]}
		</Switch>
	</form>
</section>
