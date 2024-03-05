<script lang="ts">
	import { InputRange } from "ui";
	import { getContext } from "svelte";
	import { round } from "utils/math";

	import { LensProjection } from "../../components";
	import styles from "./equivalent-focal-length.module.css";

	let focalLength = 16;
	let cropFactor = 1;
	let focalLengthMatch = 16;
	let cropFactorMatch = 1;

	const t = getContext<Record<string, string>>("t")["equivalent-focal-length"];
</script>

<section class="wide interactive {styles.wrapper}">
	<h3>
		{t["title"]}
	</h3>
	<LensProjection
		bind:focalLength="{focalLength}"
		bind:cropFactor="{cropFactor}"
	/>
	<div class="{styles["form-wrapper"]}">
		<form class="{styles.form}" on:submit|preventDefault>
			<fieldset>
				<legend>{t["focal-length-eq"]}</legend>
				<output>
					{t["focal-length"]}: <span>{round(cropFactor * focalLength / cropFactorMatch)} {t["length-unit"]}</span>
				</output>
				<InputRange
					bind:value="{cropFactorMatch}"
					min="{1}"
					max="{4}"
					step="{0.1}"
					output
				>
					{t["crop-factor"]}
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
					{t["focal-length"]}
				</InputRange>
				<InputRange
					bind:value="{cropFactor}"
					min="{1}"
					max="{4}"
					output
					step="{0.1}"
				>
					{t["crop-factor"]}
				</InputRange>
			</fieldset>
			<span>=</span>
			<fieldset>
				<legend>{t["crop-factor-eq"]}</legend>
				<output>
					{t["crop-factor"]}: <span>{round(cropFactor * focalLength / focalLengthMatch, 1)}</span>
				</output>
				<InputRange
					bind:value="{focalLengthMatch}"
					min="{16}"
					max="{120}"
					output
				>
					{t["focal-length"]}
				</InputRange>
			</fieldset>
		</form>
	</div>
</section>
