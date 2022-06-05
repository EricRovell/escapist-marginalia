<script lang="ts" context="module">
	import Link from "../Link.svelte";
</script>

<script lang="ts">
	import { pathModalPhoto } from "@core/paths";
	import styles from "./gallery-image.module.css";

	export let id: string;
</script>

<Link className={styles.link} href={$pathModalPhoto(id.toString())}>
	<figure class={styles.figure}>
		<slot />
		<figcaption>
			<slot name="caption" />
		</figcaption>
	</figure>
</Link>
