<script lang="ts" context="module">
	import Link from "../Link.svelte";
	import { getItemsSpan } from "./Gallery.helpers";
</script>

<script lang="ts">
	import { pathModalPhoto } from "@core/paths";
	import styles from "./gallery.module.css";

	export let cellScale = 400;
	export let id: number;
	export let width: number;
	export let height: number;

	let style = getItemsSpan({ width, height }, cellScale);
</script>

<li class={styles["gallery-item"]} {style} on:click>
	<Link href={$pathModalPhoto(id.toString())}>
		<figure class={styles.figure}>
			<slot />
			<figcaption>
				<slot name="caption" />
			</figcaption>
		</figure>
	</Link>
</li>