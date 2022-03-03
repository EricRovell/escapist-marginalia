<script lang="ts">
	import { Slider } from "@components";

	export let angle = -5;
	export let petals = 6;
	export let size = 250;
</script>

<!--
	Source: https://codepen.io/Rplus/pen/pVNKmL
-->
<div class="root" style="--camera-size: {size}px">
	<div class="camera-aperture" style="--aperture-size: {angle}deg; --petals: {petals};">
			<div class="blade-box">
				{#each { length: petals } as _, i}
					<div class="blade" style="--i: {i + 1}" />
				{/each}
			</div>
	</div>
	<Slider
		bind:value={angle}
		min={-35}
		max={-5}
		name="aperture-number"
	/>
</div>

<style>
	.root {
		display: flex;
		flex-flow: column;
		place-items: center;
		gap: var(--space-m);
	}

	.camera-aperture {
		border-radius: 50%;
		border: 5px solid #fff;
		overflow: hidden;
		transform: rotate(1deg);

		width: min(100%, var(--camera-size));
		height: var(--camera-size);
		aspect-ratio: 1 / 1;
	}

	.blade-box {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
	}

	.blade {
		--rotation-step: calc(360deg / var(--petals));
		--rotation-step-negative: calc(-1 * var(--rotation-step));

		position: absolute;
		top: 0;
		left: 50%;
		width: 50%;
		height: 100%;
		transform: rotate(calc(var(--i) * var(--rotation-step))) rotateX(var(--rotation-step-negative)) scaleY(5);
		transform-origin: 0% 50%;
	}

 .blade::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transform-origin: 0% 0%;
		background-color: #1b1b1b;
		outline: 3px solid white;
		transform: rotate(var(--aperture-size, -10deg));
		transition: transform 0.3s;
	}
</style>