<script context="module">
	import { default as code } from "./Code.svelte";
	import { Link as a } from "@components";
	export { code, a };
</script>

<script>
	import { TOC } from "@components";
	import styles from "./blogpost.module.css";
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
	
	Layout for blogposts about Project Euler, so the math & code highlight are included.
-->
<article class={styles.body}>
	<header class={styles.header}>
		<h1>{title}</h1>
	</header>
	<aside>
		<TOC headings={toc} />
	</aside>
	<main class={styles.article}>
		<slot name="problem" class={styles.problem} />
		<slot />
	</main>
</article>