<script lang="ts">
	import { Masthead, Footer } from "$lib/views";
	import BottomMenu from "./root.bottom-menu.svelte";

	import "@styles/utility.css";
	import "@styles/tokens.css";
	import "@styles/normalize.css";
	import "@styles/theme-dark.css";
	import "@styles/theme-light.css";
	import "@styles/typography.css";
	import styles from "./root.module.css";
</script>

<div class={styles.app} id="app">
	<Masthead />
	<BottomMenu />
	<div class={styles.content}>
		<slot />
	</div>
	<Footer />
</div>
