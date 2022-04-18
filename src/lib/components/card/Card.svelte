<script lang="ts">
	import styles from "./card.module.css";

	export let className = "";
</script>

<article class={`card ${styles.card} ${className}`}>
	{#if $$slots.header}
		<header>
			<slot name="header" />
		</header>
	{/if}
	<slot />
	{#if $$slots.footer}
		<footer>
			<slot name="footer" />
		</footer>
	{/if}
</article>