<script lang="ts">
	import { tweened } from "svelte/motion";
	import { Radio } from "@components";
	import { Diaphragm } from "../components";

	export let t: Record<string, string>;

	let angle = tweened(45);

	const fnumbers = [ 2.8, 4, 5.6, 8, 11 ];

	const handleChange = async (e: InputEvent) => {
		const target = e.target as HTMLInputElement;
		const fstop = Number(target.value);
		const dr = 16 - 16 / 2 ** fstop;
		await angle.set(45 + dr * 2.5);
	};
</script>

<!--
	Demonstrates the diaphragm movement within f-stop change.
-->
<section class="wide wrapper">
	<h3>{t["title"]}</h3>
	<Diaphragm bind:angle={$angle} />
	<form on:submit|preventDefault style="text-align: center">
		<Radio.Group
			on:change={handleChange}
			name="f-stops"
			legend={t["aperture-number"]}
		>
			{#each fnumbers as fnumber, i}
				<Radio.Button	value="{i.toString()}">
					f/{fnumber}
				</Radio.Button>
			{/each}
		</Radio.Group>
	</form>
</section>
