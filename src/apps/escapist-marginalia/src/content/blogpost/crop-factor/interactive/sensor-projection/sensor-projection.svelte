<script lang="ts">
	import { getContext } from "svelte";
	import { InputRange } from "ui";

	import LensFocalLength from "./lens-focal-length.svelte";
	import { LensProjection } from "../../components";
	import type { Translation } from "../../translations/types";
	import styles from "./sensor-projection.module.css";

	let focalLength = 16;
	let cropFactor = 1;

	const t = getContext<Translation>("t");
</script>

<section class="wide interactive">
	<h3>{t.TITLE_SENSOR_PROJECTION}</h3>
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
		<InputRange
			bind:value="{focalLength}"
			min="{16}"
			max="{120}"
			output
		>
			{t.FOCAL_LENGTH}
		</InputRange>
		<InputRange
			bind:value="{cropFactor}"
			min="{1}"
			max="{6}"
			step="{0.1}"
			output
		>
			{t.CROP_FACTOR}
		</InputRange>
	</form>
</section>
