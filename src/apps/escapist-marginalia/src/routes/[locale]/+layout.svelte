<script>
	import { page } from "$app/stores";
	import { Meta } from "ui";

	import { locale } from "@core/i18n";

	$: $locale = $page.params.locale;
</script>

<Meta
	meta={{
		author: "Eric Rovell",
		language: $locale
	}}
/>

<slot />
