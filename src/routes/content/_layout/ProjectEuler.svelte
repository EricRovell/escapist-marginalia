<script context="module">
	import { default as code } from "./Code.svelte";
	import { Link as a } from "@components";
	export { code, a };
</script>

<script>
	import styles from "./blogpost.module.css";
	import "katex/dist/katex.min.css";

	export let title;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<!--
	@component
	
	Layout for blogposts about Project Euler, so the math & code highlight are included.
-->
<article class={styles.article}>
	<header class={styles.header}>
		<h1>{title}</h1>
	</header>
	<main>
		<slot name="problem" class={styles.problem} />
		<slot />
	</main>
</article>