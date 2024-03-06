<script lang="ts">
	import { getContext } from "svelte";

	import Setup from "./setup.svelte";
	import Progress from "./progress.svelte";
	import type { Settings } from "./challenge.types";
	import type { Translation } from "../../translations/types";

	const t = getContext<Translation>("t");

	let state: "setup" | "in-progress" = "setup";
	let settings: Settings;

	const handleSubmit = (e: SubmitEvent) => {
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		settings = {
			numberMin: Number(formData.get("number-min")),
			numberMax: Number(formData.get("number-max")),
			radixFrom: Number(formData.get("radix-from")),
			radixTo: Number(formData.get("radix-to"))
		};

		state = "in-progress";
	};
</script>

<article class="wide interactive">
	<h3>{t.TITLE_EXERCISE}</h3>
	{#if state === "setup"}
		<Setup on:submit="{handleSubmit}" />
	{:else}
		<Progress
			on:finish={() => state = "setup"}
			{settings}
		/>
	{/if}
</article>
