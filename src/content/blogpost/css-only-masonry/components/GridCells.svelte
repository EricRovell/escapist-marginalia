<script lang="ts">
	import { Range } from "@components";
	import styles from "./styles.module.css";

	export let items = 20;
	export let scale = 50;
</script>

<!--
	@component

	Demo for `CSS Grid` width dense flow and spanned items.
-->
<section class="{styles.wide} wide {styles["grid-cells"]}">
	<Range bind:value={scale} min={25} max={125} step={10} tooltip>
		Scale
	</Range>
	<Range bind:value={items} min={1} max={50} step={1} tooltip>
		Items
	</Range>
	<ul class="grid" style:--masonry-scale="{scale}px">
		{#each { length: items } as _}
			<li
				class={styles["grid-item"]}
			/>
		{/each}
	</ul>
</section>