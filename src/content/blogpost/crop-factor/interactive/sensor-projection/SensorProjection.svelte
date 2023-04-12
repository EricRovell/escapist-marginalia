<script lang="ts">
	import { getContext } from "svelte";
	import { Range } from "@components";
	import LensFocalLength from "./LensFocalLength.svelte";
	import { LensProjection } from "../../components";
	import styles from "./sensor-projection.module.css";

	let focalLength = 16;
	let cropFactor = 1;

	const t = getContext<Record<string, string>>("t")["sensor-projection"];
</script>

<section class="wide interactive">
	<h3>
		{t["title"]}
	</h3>
	<div class="{styles.wrapper}">
		<div class="{styles.content}">
			<LensFocalLength
				bind:focalLength
				bind:cropFactor
			/>
			<LensProjection
				bind:focalLength
				bind:cropFactor
			/>
		</div>
	</div>
	<form
		class="{styles.form}"
		on:submit|preventDefault
	>
		<Range
			bind:value="{focalLength}"
			min="{16}"
			max="{120}"
			output
		>
			{t["focal-length"]}
		</Range>
		<Range
			bind:value="{cropFactor}"
			min="{1}"
			max="{6}"
			step="{0.1}"
			output
		>
			{t["crop-factor"]}
		</Range>
	</form>
</section>
