<script>
	import { page } from "$app/stores";
	import { locale } from "@core/i18n";

	$: $locale = $page.params.lang;
</script>

<slot />