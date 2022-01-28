<script context="module" lang="ts">
	import { waitLocale, i18nInit } from "@core/i18n";

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ params }) {
		void i18nInit(params.lang as string);
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