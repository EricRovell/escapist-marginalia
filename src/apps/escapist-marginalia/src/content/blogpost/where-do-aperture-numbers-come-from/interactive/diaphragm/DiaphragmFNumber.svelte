<script lang="ts">
	import { getContext } from "svelte";
	import { tweened } from "svelte/motion";
	import { InputRadio } from "ui";

	import { Diaphragm } from "../../components";

	const t: Record<string, string> = getContext("t")["diaphragm-f-stop"];

	let angle = tweened(45);
	let value = 0;

	const fnumbers = [ 2.8, 4, 5.6, 8, 11 ];

	const handleChange = async (e: InputEvent) => {
		const target = e.target as HTMLInputElement;
		const fstop = Number(target.value);
		value = fstop;

		const dr = 16 - 16 / 2 ** fstop;
		await angle.set(45 + dr * 2.5);
	};
</script>

<!--
	Demonstrates the diaphragm movement within f-stop change.
-->
<section class="wide wrapper interactive">
	<h3>{t["title"]}</h3>
	<Diaphragm bind:angle={$angle} />
	<form on:submit|preventDefault style="text-align: center">
		<InputRadio.Group
			on:change={handleChange}
			name="f-stops"
			legend={t["aperture-number"]}
		>
			{#each fnumbers as fnumber, i}
				<InputRadio.Button value="{i.toString()}" checked="{i === value}">
					f/{fnumber}
				</InputRadio.Button>
			{/each}
		</InputRadio.Group>
	</form>
</section>
