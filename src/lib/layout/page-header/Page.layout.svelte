<script>
	import styles from "./page.module.css";

	export let classNameBanner = "";
	export let classNameContent = "";
	export let wide = false;

	$: banner = $$slots.banner;
</script>

<!--
	Right now Layout does not support named slots.
	When it is implemented, move the component into __layout-page.svelte

	h1.headline and p.headline inside banner slot have some predefined styling.
-->
<main class={styles.page} class:wide>
	{#if banner}
		<header class={`${styles.banner} ${classNameBanner}`}>
			<slot name="banner" />
		</header>
	{/if}
	<section
		class={`${styles.content} ${classNameContent}`}
		label="content"
		class:no-banner={!banner}
	>
		<slot />
	</section>
</main>