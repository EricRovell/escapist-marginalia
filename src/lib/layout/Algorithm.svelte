<script context="module">
	import { Link as a, Code as code } from "@components";
	export { code, a };
</script>

<script>
	import { TOC } from "@components";
	import styles from "@styles/pages/blogpost.module.css";
	import "katex/dist/katex.min.css";

	export let title;
	export let toc = [];
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<!--
	@component
	
	Layout for blogposts where math equations is needed.
-->
<article class={styles.body}>
	<header class={styles.header}>
		<h1>{title}</h1>
	</header>
	<aside class={styles.sidebar}>
		<TOC headings={toc} />
	</aside>
	<main class={styles.article}>
		<slot />
	</main>
</article>