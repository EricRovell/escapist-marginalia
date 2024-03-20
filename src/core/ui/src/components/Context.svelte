<script lang="ts">
	import { setContext } from "svelte";
	import { isNotNullable } from "utils/validators";

	export let key: string | null = null;
	export let value: unknown;

	if (isNotNullable(key)) {
		setContext(key, value);
	}
</script>

<slot />
