<script lang="ts">
	import { Meta } from "ui";

	import { webpage, webpageRoot } from "@core/paths";
	//import { t } from "@core/i18n";
	import { LayoutPage } from "../page-header";
	import styles from "./sketch.layout.module.css";
	import type { Sketch } from "@types";

	export let metadata: Sketch;

	let {
		cover,
		dateUpdated,
		description,
		keywords = [],
		lang,
		title
	} = metadata;
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
		section: "sketch",
		site_name: "Eric Rovell",
		author: "Eric Rovell",
		url: $webpage,
		"article:modified_time": dateUpdated,
		image: `${$webpageRoot}${cover.src}`
	}}
	twitter={{
		card: "summary",
		title,
		description,
		url: $webpage,
		image: `${$webpageRoot}${cover.src}`
	}}
/>

<LayoutPage className="{styles.main}" wide>
	<div slot="banner" class="{styles.banner}" />
	<article class={styles.wrapper}>
		<slot name="sketch" />
		<!-- <aside class="{styles["shortcuts-wrapper"]}">
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
		</aside> -->
		<header class="{styles.header}">
			<h1>{title}</h1>
			<p>{description}</p>
		</header>
		<section class="{styles.article}">
			<slot />
		</section>
	</article>
</LayoutPage>
