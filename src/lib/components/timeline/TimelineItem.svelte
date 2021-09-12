<script lang="ts">
	import Datetime from "../Datetime.svelte";
	import styles from "./timeline.module.css";

	export let date: Date;
	export let action = "New blogpost";
</script>

<li class={styles.item}>
	<div class={styles.marker} />
	<article>
		<Datetime {date} />
		<h2>{action}</h2>
		<slot />
	</article>
</li>