<script lang="ts">
	import { InputRange } from "ui";
	import { getContext } from "svelte";
	import { round } from "utils/math";

	import { LensProjection } from "../../components";
	import type { Translation } from "../../translations/types";
	import styles from "./equivalent-focal-length.module.css";

	let focalLength = 16;
	let cropFactor = 1;
	let focalLengthMatch = 16;
	let cropFactorMatch = 1;

	const t = getContext<Translation>("t");
</script>

<section class="wide interactive {styles.wrapper}">
	<h3>{t.TITLE_EQUIVALENT_FOCAL_LENGTH}</h3>
	<LensProjection
		bind:focalLength="{focalLength}"
		bind:cropFactor="{cropFactor}"
	/>
	<div class="{styles["form-wrapper"]}">
		<form class="{styles.form}" on:submit|preventDefault>
			<fieldset>
				<legend>{t.FOCAL_LENGTH_EQ}</legend>
				<output>
					{t.FOCAL_LENGTH}: <span>{round(cropFactor * focalLength / cropFactorMatch)} {t.LENGTH_UNIT}</span>
				</output>
				<InputRange
					bind:value="{cropFactorMatch}"
					min="{1}"
					max="{4}"
					step="{0.1}"
					output
				>
					{t.CROP_FACTOR}
				</InputRange>
			</fieldset>
			<span>=</span>
			<fieldset>
				<legend>Parameters</legend>
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
					max="{4}"
					output
					step="{0.1}"
				>
					{t.CROP_FACTOR}
				</InputRange>
			</fieldset>
			<span>=</span>
			<fieldset>
				<legend>{t.CROP_FACTOR_EQ}</legend>
				<output>
					{t.CROP_FACTOR}: <span>{round(cropFactor * focalLength / focalLengthMatch, 1)}</span>
				</output>
				<InputRange
					bind:value="{focalLengthMatch}"
					min="{16}"
					max="{120}"
					output
				>
					{t.FOCAL_LENGTH}
				</InputRange>
			</fieldset>
		</form>
	</div>
</section>
