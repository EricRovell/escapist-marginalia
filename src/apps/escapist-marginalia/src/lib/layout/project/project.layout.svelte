<script lang="ts">
	import { Meta, ScrollToTop } from "ui";

	import { webpage } from "@core/paths";
	import Header from "./project.header.svelte";
	import { LayoutPage } from "../page-header";
	import styles from "./project.layout.module.css";
	import type { Project } from "@types";

	export let metadata: Project;

	let {
		dateUpdated,
		description,
		lang,
		//maintained = true,
		npm,
		keywords = [],
		repository,
		title,
		website
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
		section: "project",
		site_name: "Eric Rovell",
		author: "Eric Rovell",
		url: $webpage,
		"article:modified_time": dateUpdated
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
		{dateUpdated}
		{description}
		{npm}
		{repository}
		{title}
		{keywords}
		{website}
		slot="banner"
	/>
	<article class={styles.article}>
		<slot />
	</article>
	<ScrollToTop id="root" />
</LayoutPage>
