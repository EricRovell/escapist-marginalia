<script context="module">
	import { Link as a } from "@components";
	export { a };
</script>

<script>
	import { webpage, webpageRoot } from "@core/paths";
	import { t } from "@core/i18n";
	import { Meta } from "@components";
	import { LayoutPage } from "../page-header";
	import styles from "./sketch-page.module.css";

	export let cover;
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
		section: "sketch",
		site_name: "Eric Rovell",
		author: "Eric Rovell",
		url: $webpage,
		"article:modified_time": updated,
		image: `${$webpageRoot}${cover}`
	}}
	twitter={{
		card: "summary",
		title,
		description,
		url: $webpage,
		image: `${$webpageRoot}${cover}`
	}}
/>

<LayoutPage className="{styles.main}" wide>
	<div slot="banner" class="{styles.banner}" />
	<article class={styles.wrapper}>
		<slot name="sketch" />
		<aside class="{styles["shortcuts-wrapper"]}">
			<ul class="{styles.shortcuts}">
				<li>
					<kbd>Space</kbd>
					<span>{$t("dict.animation")}</span>
				</li>
				<li>
					<kbd>F11</kbd>
					<span>{$t("dict.fullscreen")}</span>
				</li>
				<li>
					<kbd>R</kbd>
					<span>{$t("dict.restart")}</span>
				</li>
			</ul>
		</aside>
		<header class="{styles.header}">
			<h1>{title}</h1>
			<p>{description}</p>
		</header>
		<section class="{styles.article}">
			<slot />
		</section>
	</article>
</LayoutPage>
