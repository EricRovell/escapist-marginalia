<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Button } from "../button";
	import { t } from "@core/i18n";

	type Options = $$Generic;

	export let options: Options;
	export let optionsImmutable: Set<keyof Options> | undefined = undefined;
	export let state: typeof options = { ...options };

	const dispatch = createEventDispatcher();

	const handleReset = () => {
		state = { ...options };
		dispatch("reset");
	};

	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const name = target.name as keyof Options;

		if (optionsImmutable && optionsImmutable.has(name)) {
			dispatch("reset");
		}
	};
</script>

<form
	on:submit|preventDefault
	on:change="{handleChange}"
	on:change
>
	<slot />
	<Button on:click="{handleReset}">
		{$t("dict.reset")}
	</Button>
</form>
