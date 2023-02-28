<script lang="ts">
	import { getContext } from "svelte";
	import { Range } from "@components";
	import { cell } from "../../components/cell.module.css";
	import styles from "./grid-cells.module.css";

	export let items = 20;
	export let scale = 50;

	const t = getContext<Record<string, string>>("t")["grid-cells"];
</script>

<!--
	@component

	Demo for `CSS Grid` width dense flow and spanned items.
-->
<section class="wide interactive">
	<h3>{t["title"]}</h3>
	<form class="{styles.form}" on:submit|preventDefault>
		<Range bind:value={items} min={1} max={50} step={1} output>
			{t["items"]}
		</Range>
		<Range bind:value={scale} min={25} max={75} step={5}>
			{t["scale"]}
		</Range>
	</form>
	<ul class="{styles.grid}" style:--masonry-scale="{scale}px">
		{#each { length: items } as _}
			<li class={cell} />
		{/each}
	</ul>
</section>
