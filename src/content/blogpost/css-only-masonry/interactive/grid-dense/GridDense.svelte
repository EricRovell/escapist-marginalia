<script context="module" lang="ts">
	import { randBool, randInt } from "@utils/random";
</script>

<script lang="ts">
	import { getContext } from "svelte";
	import { Range } from "@components";
	import { cell } from "../../components/cell.module.css";
	import styles from "./grid-dense.module.css";

	export let items = 20;

	const t = getContext<Record<string, string>>("t")["grid-dense"];

	const getSpan = () => {
		const spanned = randBool(0.2);
		return spanned
			? [ randInt(1, 4), randInt(2, 4) ]
			: [ 1, 1 ];
	};
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
	</form>
	<ul class="{styles["grid-span"]}">
		{#each { length: items } as _, i}
			{@const [ row, column ] = getSpan()}
			{@const spanned = row !== 1 || column !== 1}
			{@const aspect = spanned ? `${row} / ${column}` : ""}
			<li
				class="{cell}"
				style:grid-column="span {row}"
				style:grid-row="span {column}"
			>
				{aspect}
			</li>
		{/each}
	</ul>
</section>
