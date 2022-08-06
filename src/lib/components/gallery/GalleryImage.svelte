<script lang="ts" context="module">
	import Link from "../Link.svelte";
</script>

<script lang="ts">
	import { pathGalleryImage } from "@core/paths";
	import styles from "./gallery-image.module.css";

	export let id: string;
	export let dominant: string;
</script>

<Link className={styles.link} href={$pathGalleryImage(id.toString())}>
	<figure class={styles.figure} style:--dominant={dominant}>
		<slot />
		<figcaption>
			<slot name="caption" />
		</figcaption>
	</figure>
</Link>
