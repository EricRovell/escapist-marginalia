<script context="module">
	import { waitLocale } from "@core/i18n";
	import { i18nInit } from "@core/i18n";

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		void i18nInit();
		await waitLocale();
		
		return {
			status: 200
		};
	}
</script>

<script lang="ts">
	import { Root } from "@lib/layout";
</script>

<Root>
	<slot />
</Root>