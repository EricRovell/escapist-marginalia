<script context="module">
	import { Link as a, Code as pre } from "@components";
	export { pre, a };
</script>

<script>
	import { webpage, webpageRoot } from "@core/paths";
	import { Meta, TOC, ScrollToTop } from "@components";
	import Header from "./Header.svelte";
	import { LayoutPage } from "../page-header";
	import styles from "./blogpost.module.css";

	export let cover;
	export let dateCreated;
	export let dateUpdated;
	export let description;
	export let keywords;
	export let lang;
	export let title;
	export let toc = [];
	export let translation = null;
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
		site_name: "Eric Rovell",
		author: "Eric Rovell",
		url: $webpage,
		"article:published_time": dateCreated,
		"article:modified_time": dateUpdated,
		image: `${$webpageRoot}${cover}`
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
		{dateCreated}
		{dateUpdated}
		{translation}
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
	<ScrollToTop
		id="root"
	/>
</LayoutPage>
