<script lang="ts">
	import { Range } from "@components";

	export let angle = -5;
	export let petals = 6;
	export let size = 250;
</script>

<!--
	Source: https://codepen.io/Rplus/pen/pVNKmL
-->
<section class="wide">
	<div class="camera-aperture" style="--diaphragm-size: {angle}deg; --diaphragm-petals: {petals};">
			<div class="blade-box">
				{#each { length: petals } as _, i}
					<div class="blade" style="--i: {i + 1}" />
				{/each}
			</div>
	</div>
	<form class="controls">
		<Range bind:value={angle} min={-35} max={-5}>
			Petal angle
		</Range>
	</form>
</section>

<style>
	.controls {
		width: min(100%, 40ch);
	}

	.controls :global(label) {
		text-align: center;
	}

	.camera-aperture {
		border-radius: 50%;
		border: 5px solid #fff;
		overflow: hidden;
		transform: rotate(1deg);

		width: min(100%, 35vh);
		aspect-ratio: 1 / 1;
	}

	.blade-box {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
	}

	.blade {
		--diaphragm-step: calc(360deg / var(--diaphragm-petals));
		--diaphragm-step-negative: calc(-1 * var(--diaphragm-step));

		position: absolute;
		top: 0;
		left: 50%;
		width: 50%;
		height: 100%;
		transform: rotate(calc(var(--i) * var(--diaphragm-step))) rotateX(var(--diaphragm-step-negative)) scaleY(5);
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
		transform: rotate(var(--diaphragm-size, -10deg));
		transition: transform 0.3s;
	}
</style>