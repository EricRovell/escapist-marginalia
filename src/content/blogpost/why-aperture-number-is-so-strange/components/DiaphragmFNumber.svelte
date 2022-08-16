<script lang="ts">
	import { tweened } from "svelte/motion";
	import FNumberControls from "./FNumberControls.svelte";

	export let dict: Record<string, string>;

	const r = 50;
	const stroke = 8;

	let stop = tweened(5.6);
</script>

<section class="wide wrapper">
	<svg viewBox="0 0 100 100" class="aperture">
		<defs>
			<mask id="aperture-mask">
				<rect
					width="100%"
					height="100%"
					fill="white"
				/>
				<circle
					cx={r}
					cy={r}
					r={(r - 2 * stroke) / 2 ** (0.5 * $stop)}
					fill="black"
				/>
			</mask>
		</defs>
		<circle
			cx={r}
			cy={r}
			r={r - stroke}
			fill="var(--color-gray-500)"
			stroke="var(--color-gray-700)"
			stroke-width={stroke}
			mask="url(#aperture-mask)"
		/>		
	</svg>
	<FNumberControls
		bind:value={$stop}
		name="aperture"
		legend="{dict["aperture-number"]}"	
	/>
</section>

<style>
	.wrapper :global(fieldset)  {
		width: fit-content;
	}

	.aperture {
		--aperture-size: min(100% - var(--space-m), 250px);
		width: var(--aperture-size);
		height: var(--aperture-size);
	}
</style>
