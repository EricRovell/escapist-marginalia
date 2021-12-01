<script lang="ts">
	import { browser } from "$app/env";
	import { goto } from "$app/navigation";
	import { lang } from "@core/i18n";

	if (browser) {
		void goto(`${$lang}/home`, { replaceState: true });
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>