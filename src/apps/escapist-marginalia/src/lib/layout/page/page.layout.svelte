<script lang="ts">
	import { webpage } from "@core/paths";
	import { Meta } from "@components";
	import { LayoutPage } from "../page-header";
	import styles from "./page.module.css";

	export let description: string;
	export let keywords: string[];
	export let lang: string;
	export let title: string;
	export let updated: string;
</script>

<Meta
	title="{title}"
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
	<div class={styles.header} slot="banner">
		<h1>
			{title}
		</h1>
		<p>{description}</p>
	</div>
	<article class={styles.article}>
		<slot />
	</article>
</LayoutPage>
