<script context="module" lang="ts">
	import { randBool, randInt } from "@utils/random";
</script>

<script lang="ts">
	import { Range } from "@components";
	import styles from "./styles.module.css";

	export let items = 20;

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
<section class="{styles.wide} wide {styles["grid-span"]}">
	<Range bind:value={items} min={1} max={50} step={1}>
		Items
	</Range>
	<ul class="grid">
		{#each { length: items } as _, i}
			{@const [ row, column ] = getSpan()}
			{@const spanned = row !== 1 || column !== 1}
			{@const aspect = spanned ? `${row} / ${column}` : ""}
			<li
				class={styles["grid-item"]}
				style:grid-column="span {row}"
				style:grid-row="span {column}"
			>
				{aspect}
			</li>
		{/each}
	</ul>
</section>