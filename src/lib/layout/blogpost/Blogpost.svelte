<script context="module">
	import { Link as a, Code as pre } from "@components";
	export { pre, a };
</script>

<script>
	import { webpage } from "@core/paths";
	import { Meta, TOC } from "@components";
	import Header from "./Header.svelte";
	import { LayoutPage } from "../page-header";
	import styles from "./blogpost.module.css";

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

<LayoutPage wide>
	<Header
		{title}
		{description}
		{keywords}
		{created}
		{updated}
		slot="banner"
	/>
	<article class={styles.article}>
		<aside class={styles.toc}>
			<TOC headings={toc} {title} />
		</aside>
		<slot name="pre-content" />
		<slot />
		<slot name="post-content" />
	</article>
</LayoutPage>