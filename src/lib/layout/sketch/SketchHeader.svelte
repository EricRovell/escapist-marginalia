<script lang="ts">
	import styles from "./sketch-header.module.css";

	export let description: string;
	export let title: string;
</script>

<div class={styles.wrapper}>
	<h1>
		{title}
	</h1>
	<p>{description}</p>
	<slot />
</div>
