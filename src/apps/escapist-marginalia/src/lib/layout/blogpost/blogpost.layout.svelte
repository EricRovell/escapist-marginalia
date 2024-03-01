<script lang="ts">
	import { webpage, webpageRoot } from "@core/paths";
	import { Meta, TOC, ScrollToTop } from "@components";
	import Header from "./blogpost.header.svelte";
	import { LayoutPage } from "../page-header";
	import styles from "./blogpost.layout.module.css";
	import type { BlogpostMetadata } from "@types";

	export let metadata: BlogpostMetadata;

	let {
		cover,
		dateCreated,
		dateUpdated,
		description,
		keywords = [],
		lang,
		title,
		toc = [],
		translation = null
	} = metadata;
</script>

<Meta
	{title}
	meta={{
		description,
		keywords: keywords.join(","),
		language: lang
	}}
	openGraph={{
		title,
		description,
		locale: lang,
		type: "article",
		tag: keywords.join(","),
		site_name: "Eric Rovell",
		author: "Eric Rovell",
		url: $webpage,
		"article:published_time": dateCreated,
		"article:modified_time": dateUpdated,
		image: `${$webpageRoot}${cover.src}`
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
