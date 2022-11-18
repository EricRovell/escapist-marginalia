<script context="module">
	import { Link as a } from "@components";
	export { a };
</script>

<script>
	import { webpage } from "@core/paths";
	import { Meta } from "@components";
	import { LayoutPage } from "../page-header";
	import styles from "./sketch-page.module.css";

	export let description;
	export let keywords = [];
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

<LayoutPage className="{styles.main}" wide>
	<div slot="banner" class="{styles.banner}" />
	<article class={styles.wrapper}>
		<slot name="sketch" />
		<header class="{styles.header}">
			<h1>{title}</h1>
			<p>{description}</p>
		</header>
		<section class="{styles.article}">
			<slot />
		</section>
	</article>
</LayoutPage>
