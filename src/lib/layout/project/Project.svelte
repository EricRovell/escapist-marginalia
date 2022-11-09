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

	export let description;
	export let lang;
	export let maintained;
	export let name;
	export let npm;
	export let repository;
	export let techstack = [];
	export let updated;
	export let website;

	console.log(name);
</script>

<Meta
	title="{name}"
	meta={{
		description,
		keywords: techstack,
		language: lang
	}}
	openGraph={{
		title: name,
		description,
		locale: lang,
		type: "article",
		tag: techstack,
		section: "project",
		site_name: "Eric Rovell",
		author: "Eric Rovell",
		url: $webpage,
		"article:modified_time": updated
	}}
	twitter={{
		card: "summary",
		title: name,
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
