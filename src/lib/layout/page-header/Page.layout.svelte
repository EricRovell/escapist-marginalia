<script>
	import styles from "./page.module.css";

	$: banner = $$slots.banner;
</script>

<!--
	Right now Layout does not support named slots.
	When it is implemented, move the component into __layout-page.svelte

	h1.headline and p.headline inside banner slot have some predefined styling.
-->
<main class={styles.page}>
	{#if banner}
		<header class={styles.banner}>
			<slot name="banner" />
		</header>
	{/if}
	<section class={styles.content} label="content" class:no-banner={!banner}>
		<slot />
	</section>
</main>