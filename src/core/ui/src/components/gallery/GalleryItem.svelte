<script lang="ts" context="module">
	import { Link } from "../link";
</script>

<script lang="ts">
	import { pathGalleryImage } from "@core/paths";
	import styles from "./gallery-item.module.css";

	export let dominant: string;
	export let slug: string;
</script>

<Link className={styles.link} href={$pathGalleryImage(slug)}>
	<figure class={styles.figure} style:--dominant={dominant}>
		<slot />
		<figcaption>
			<slot name="caption" />
		</figcaption>
	</figure>
</Link>
