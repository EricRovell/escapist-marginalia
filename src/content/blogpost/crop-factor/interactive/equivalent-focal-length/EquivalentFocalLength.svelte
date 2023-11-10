<script lang="ts">
	import { getContext } from "svelte";
	import { Range } from "@components";
	import { LensProjection } from "../../components";
	import { round } from "$lib/utils/helpers";
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
				<Range
					bind:value="{cropFactorMatch}"
					min="{1}"
					max="{4}"
					step="{0.1}"
					output
				>
					{t["crop-factor"]}
				</Range>
			</fieldset>
			<span>=</span>
			<fieldset>
				<legend>Parameters</legend>
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
					max="{4}"
					output
					step="{0.1}"
				>
					{t["crop-factor"]}
				</Range>
			</fieldset>
			<span>=</span>
			<fieldset>
				<legend>{t["crop-factor-eq"]}</legend>
				<output>
					{t["crop-factor"]}: <span>{round(cropFactor * focalLength / focalLengthMatch, 1)}</span>
				</output>
				<Range
					bind:value="{focalLengthMatch}"
					min="{16}"
					max="{120}"
					output
				>
					{t["focal-length"]}
				</Range>
			</fieldset>
		</form>
	</div>
</section>
