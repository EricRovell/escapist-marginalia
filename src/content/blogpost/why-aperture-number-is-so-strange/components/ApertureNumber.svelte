<script lang="ts">
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";
	import { RadioButton } from "@components";

	const options = [
		{ label: "f/2.8", value: "3" },
		{ label: "f/5.6", value: "2" },
		{ label: "f/8.1", value: "1" },
		{ label: "f/11", value: "0" },
	];

	let current = 3;

	const p = tweened(current, {
		duration: 400,
		easing: cubicOut
	});
</script>

<div>
	<svg viewBox="0 0 100 100">
		<defs>
			<mask id="aperture-mask">
				<rect
					width="100%"
					height="100%"
					fill="white"
				/>
				<circle
					cx={50}
					cy={50}
					r={40 / 2 ** (0.5 * $p)}
					fill="black"
				/>
			</mask>
		</defs>
		<circle
			cx={50}
			cy={50}
			r={50}
			fill="#b1b1b1"
			mask="url(#aperture-mask)"
		/>
	</svg>
	<div class="options">
		{#each options as { label, value }}
			<RadioButton
				{label}
				{value}
				name="aperture-size"
				bind:group={current}
				on:change={() => p.set(+value)}
			/>
		{/each}
	</div>
</div>

<style>
	.options {
		display: flex;
		gap: var(--space-s);
	}

	svg {
		width: 250px;
		height: 250px;
	}
</style>