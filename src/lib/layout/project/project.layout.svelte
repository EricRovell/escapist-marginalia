<script lang="ts">
	import { webpage } from "@core/paths";
	import { Meta, ScrollToTop } from "@components";
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
		repository,
		title,
		techstack = [],
		website
	} = metadata;
</script>

<Meta
	{title}
	meta={{
		description,
		keywords: techstack.join(","),
		language: lang
	}}
	openGraph={{
		title,
		description,
		locale: lang,
		type: "article",
		tag: techstack.join(","),
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
		{techstack}
		{website}
		slot="banner"
	/>
	<article class={styles.article}>
		<slot />
	</article>
	<ScrollToTop id="root" />
</LayoutPage>
