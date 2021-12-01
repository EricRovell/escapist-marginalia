<script context="module">
	import { Link as a, Code as code } from "@components";
	export { code, a };
</script>

<script>
	import { webpage } from "@core/paths";
	import { Meta, TOC } from "@components";
	import styles from "@styles/pages/blogpost.module.css";
	import "katex/dist/katex.min.css";

	export let title;
	export let description;
	export let keywords;
	export let lang;
	export let created;
	export let updated;
	export let series;
	export let toc = [];
</script>

<Meta
	{title}
	meta={{
		description,
		keywords,
		language: lang
	}}
	openGraph={{
		title,
		description,
		locale: lang,
		type: "article",
		tag: keywords,
		section: series,
		site_name: "Eric Rovell",
		author: "Eric Rovell",
		url: $webpage,
		"article:published_time": created,
		"article:modified_time": updated
	}}
	twitter={{
		card: "summary",
		title,
		description,
		url: $webpage
	}}
/>

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