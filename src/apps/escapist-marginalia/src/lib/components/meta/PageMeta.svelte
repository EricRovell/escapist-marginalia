<script lang="ts">
	import { Meta } from "ui";

	import { t } from "@core/i18n";
	import { webpage } from "@core/paths";

	// the route name defined in page locales dictionary
	export let route: string;
</script>

<!--
	Commot <head /> meta tags for routes.
-->
<Meta
	title={$t(`pages.${route}.title`)}
	meta={{
		description: $t(`pages.${route}.description`),
		keywords: $t(`pages.${route}.keywords`),
		subject: $t(`pages.${route}.subject`)
	}}
	openGraph={{
		title: $t(`pages.${route}.title`),
		description: $t(`pages.${route}.description`),
		type: "website",
		url: $webpage
	}}
	twitter={{
		card: "summary",
		title: $t(`pages.${route}.title`),
		description: $t(`pages.${route}.description`),
		url: $webpage
	}}
/>
