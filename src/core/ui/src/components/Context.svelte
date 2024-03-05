<script>
	import { setContext } from "svelte";

	export let key;
	export let value;

	setContext(key, value);
</script>

<slot />
