<script lang="ts">
	import { _ } from "@core/i18n";
	import { webpage } from "@core/paths";
	import Meta from "./Meta.svelte";

	// the route name defined in page locales dictionary
	export let route: string;
</script>

<!--
	Commot <head /> meta tags for routes.
-->
<Meta
	title={$_(`pages.${route}.title`)}
	meta={{
		description: $_(`pages.${route}.description`),
		keywords: $_(`pages.${route}.keywords`),
		subject: $_(`pages.${route}.subject`)
	}}
	openGraph={{
		title: $_(`pages.${route}.title`),
		description: $_(`pages.${route}.description`),
		type: "website",
		url: $webpage
	}}
	twitter={{
		card: "summary",
		title: $_(`pages.${route}.title`),
		description: $_(`pages.${route}.description`),
		url: $webpage
	}}
/>