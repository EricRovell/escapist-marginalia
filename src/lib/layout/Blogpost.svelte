<script>
	/* eslint-disable @typescript-eslint/restrict-template-expressions */
	import { theme } from "@stores";
	import styles from "./blogpost.module.css";

	export let title;

	$: highlight = $theme === "dark" ? "dark" : "light";
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<link rel="stylesheet" href={`/styles/prism-${highlight}.css`} />
</svelte:head>

<header class={styles.header}>
	<h1>{title}</h1>
</header>
<article class={styles.article}>
	<slot />
</article>