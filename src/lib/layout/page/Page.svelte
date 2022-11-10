<script context="module">
	import { Link as a, Code as pre } from "@components";
	export { pre, a };
</script>

<script>
	import { webpage } from "@core/paths";
	import { Meta } from "@components";
	import Header from "./PageHeader.svelte";
	import { LayoutPage } from "../page-header";
	import styles from "./page.module.css";

	export let description;
	export let keywords;
	export let lang;
	export let title;
	export let updated;
</script>

<Meta
	title="{title}"
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
		section: "project",
		site_name: "Eric Rovell",
		author: "Eric Rovell",
		url: $webpage,
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
		{description}
		{title}
		slot="banner"
	/>
	<article class={styles.article}>
		<slot />
	</article>
</LayoutPage>
