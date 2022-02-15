<script>
	import { page } from "$app/stores";
	import { locale } from "@core/i18n";
	import { Meta } from "@components";

	$: $locale = $page.params.locale;
</script>

<Meta
	meta={{
		author: "Eric Rovell",
		language: $locale,
	}}
/>

<slot />