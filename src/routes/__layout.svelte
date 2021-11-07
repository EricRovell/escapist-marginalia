<script lang="ts">
	import { Root } from "@lib/layout";
	import { i18nInit } from "@core/i18n";

	void i18nInit();
</script>

<Root>
	<slot />
</Root>