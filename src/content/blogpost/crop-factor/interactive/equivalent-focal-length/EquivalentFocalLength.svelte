<script lang="ts">
	import { getContext } from "svelte";
	import { Range } from "@components";
	import { LensProjection } from "../../components";
	import styles from "./equivalent-focal-length.module.css";

	let focalLength: [ number, number ] = [ 16, 16 ];
	let cropFactor: [ number, number ] = [ 1, 1 ];

	const t = getContext<Record<string, string>>("t")["equivalent-focal-length"];

	$: match = (Math.abs(focalLength[0] * cropFactor[0] - focalLength[1] * cropFactor[1]) < 1);
</script>

<section class="wide interactive">
	<h3>
		{t["title"]}
	</h3>
	<div class="{styles.wrapper}">
		<div class="{styles.content}" class:match>
			<div>
				<LensProjection
					bind:focalLength="{focalLength[0]}"
					bind:cropFactor="{cropFactor[0]}"
				/>
				<form
					on:submit|preventDefault
				>
					<Range
						bind:value="{focalLength[0]}"
						min="{16}"
						max="{120}"
						output
					>
						{t["focal-length"]}
					</Range>
					<Range
						bind:value="{cropFactor[0]}"
						min="{1}"
						max="{6}"
						step="{0.01}"
						output
					>
						{t["crop-factor"]}
					</Range>
				</form>
			</div>
			<div>
				<LensProjection
					bind:focalLength="{focalLength[1]}"
					bind:cropFactor="{cropFactor[1]}"
				/>
				<form
					on:submit|preventDefault
				>
					<Range
						bind:value="{focalLength[1]}"
						min="{16}"
						max="{120}"
						output
					>
						{t["focal-length"]}
					</Range>
					<Range
						bind:value="{cropFactor[1]}"
						min="{1}"
						max="{6}"
						step="{0.01}"
						output
					>
						{t["crop-factor"]}
					</Range>
				</form>
			</div>
		</div>
	</div>
	<output class="{styles.output}" class:match>
		{match ? `✔ ${t["match"]}` : `✘ ${t["not-match"]}`}
	</output>
</section>
