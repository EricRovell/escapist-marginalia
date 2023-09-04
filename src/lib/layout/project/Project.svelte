<script context="module">
	import { Link as a, Code as pre } from "@components";
	export { pre, a };
</script>

<script>
	import { webpage } from "@core/paths";
	import { Meta, ScrollToTop } from "@components";
	import Header from "./ProjectHeader.svelte";
	import { LayoutPage } from "../page-header";
	import styles from "./project.module.css";

	export let dateUpdated;
	export let description;
	export let lang;
	export let maintained;
	export let npm;
	export let repository;
	export let title;
	export let techstack = [];
	export let website;
</script>

<Meta
	{title}
	meta={{
		description,
		keywords: techstack,
		language: lang
	}}
	openGraph={{
		title,
		description,
		locale: lang,
		type: "article",
		tag: techstack,
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
		{description}
		{maintained}
		{name}
		{npm}
		{repository}
		{techstack}
		{website}
		slot="banner"
	/>
	<article class={styles.article}>
		<slot />
	</article>
	<ScrollToTop id="root" />
</LayoutPage>
