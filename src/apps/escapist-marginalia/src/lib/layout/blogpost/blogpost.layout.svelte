<script lang="ts">
	import { Meta, ScrollToTop } from "ui";

	import { webpage, webpageRoot } from "@core/paths";
	import { TOC } from "$lib/components";
	import Header from "./blogpost.header.svelte";
	import { LayoutPage } from "../page-header";
	import styles from "./blogpost.layout.module.css";
	import type { BlogpostMetadata } from "@types";

	export let metadata: BlogpostMetadata;
</script>

<Meta
	title="{metadata.title}"
	meta={{
		description: metadata.description,
		keywords: metadata.keywords.join(","),
		language: metadata.lang
	}}
	openGraph={{
		title: metadata.title,
		description: metadata.description,
		locale: metadata.lang,
		type: "article",
		tag: metadata.keywords.join(","),
		site_name: "Eric Rovell",
		author: "Eric Rovell",
		url: $webpage,
		"article:published_time": metadata.dateCreated,
		"article:modified_time": metadata.dateUpdated,
		image: `${$webpageRoot}${metadata.cover.src}`
	}}
	twitter={{
		card: "summary",
		title: metadata.title,
		description: metadata.description,
		url: $webpage
	}}
/>

<LayoutPage wide>
	<Header
		title="{metadata.title}"
		description="{metadata.description}"
		keywords="{metadata.keywords}"
		dateCreated="{metadata.dateCreated}"
		dateUpdated="{metadata.dateUpdated}"
		translation="{metadata.translation}"
		slot="banner"
	/>
	<article class={styles.article}>
		<aside class={styles.toc}>
			<TOC headings={metadata.toc} title="{metadata.title}" />
		</aside>
		<slot name="pre-content" />
		<slot />
		<slot name="post-content" />
	</article>
	<ScrollToTop
		id="root"
	/>
</LayoutPage>
