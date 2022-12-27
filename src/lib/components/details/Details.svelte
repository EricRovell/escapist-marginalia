<script lang="ts">
	import styles from "./details.module.css";

	export let className = "";
	export let open = false;
</script>

<details bind:open class="{styles.details} {className}">
	<summary>
		<slot name="icon">
			<svg class={styles["default-icon"]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.44 100">
				<polygon points="0 4.45 34.16 50 0 95.55 5.94 100 43.44 50 5.94 0 0 4.45"/>
			</svg>
		</slot>
		<span class={`ellipsis ${styles.title}`}>
			<slot name="title">
				Title was not defined
			</slot>
		</span>
	</summary>
	<div class={styles.content}>
		<slot />
	</div>
</details>