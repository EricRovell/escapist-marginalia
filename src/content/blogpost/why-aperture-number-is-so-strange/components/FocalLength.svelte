<script lang="ts">
	import { Range } from "@components";
	import FNumberControls from "./FNumberControls.svelte";

	export let stroke = 3;

	export let width = 700;
	export let height = 400;

	export let f = 100;
	export let fmax = 200;
	export let fmin = 24;

	export let r2 = 82;
	export let r1 = 24;
	let stop = 0;

	let aperture: number;
	$: aperture = 2 ** (stop / 2);

	let cY = height / 2;

	let ra: number;
	$: ra = f / aperture / 2;
</script>

<section class="wide">
	<svg viewBox="{-stroke} {-stroke} {width + stroke} {height + stroke}">
		<!-- connectors -->
		<line
			x1="{f}"
			y1="{cY - r2}"
			x2="{width - r2}"
			y2="{cY - r2}"
			style="stroke-width: 1px; stroke: white; opacity: 0.5;"
		/>
		<line
			x1="{f}"
			y1="{cY + r2}"
			x2="{width - r2}"
			y2="{cY + r2}"
			style="stroke-width: 1px; stroke: white; opacity: 0.5;"
		/>
		<line
			x1="{f}"
			y1="{cY - ra}"
			x2="{width - r2}"
			y2="{cY - ra}"
			style="stroke-width: 1px; stroke: white; opacity: 0.5;"
		/>
		<line
			x1="{f}"
			y1="{cY + ra}"
			x2="{width - r2}"
			y2="{cY + ra}"
			style="stroke-width: 1px; stroke: white; opacity: 0.5;"
		/>
		<!-- Rays -->
		<line
			x1="0"
			y1="{cY + r1}"
			x2="{f}"
			y2="{cY - ra}"
			style="stroke-width: 1px; stroke: white; opacity: 0.5;"
		/>
		<line
			x1="0"
			y1="{cY - r1}"
			x2="{f}"
			y2="{cY + ra}"
			style="stroke-width: 1px; stroke: white; opacity: 0.5;"
		/>
		<!-- side view -->
		<polyline
			points="{0},{cY} 0,{cY - r1} {f},{cY - r2} {f},{cY}"
			stroke-width={stroke}
			stroke="red"
			fill="none"
		/>
		<polyline
			points="{0},{cY} 0,{cY + r1} {f},{cY + r2} {f},{cY}"
			stroke-width={stroke}
			stroke="red"
			fill="none"
		/>
		<!-- rear view -->
		<defs>
			<mask id="aperture-mask-focal">
				<rect
					x={width - r2 * 2 - stroke * 2}
					y={cY - r2 - stroke * 2}
					width={r2 * 2 + stroke * 4}
					height={r2 * 2 + stroke * 4}
					fill="white"
				/>
				<circle
					cx={width - r2 - stroke}
					cy={cY}
					r={ra}
					fill="black"
					stroke-width={2}
				/>
			</mask>
		</defs>
		<circle
			cx={width - r2 - stroke}
			cy={cY}
			r={r2}
			style="fill: red; stroke-width: 2px; stroke: red;"
			mask="url(#aperture-mask-focal)"
		/>
		<!-- Aperture side view -->
		<line
			x1="{f}"
			y1="{cY - ra}"
			x2="{f}"
			y2="{cY + ra}"
			style="stroke-width: 2px; stroke: blue;"
		/>
	</svg>
	<form>
		<Range bind:value={f}	min={fmin} max={fmax}>
			Focal length
		</Range>
		<FNumberControls
			bind:value={stop}
			name="aperture-1"
			legend="Aperture Number"
		/>
	</form>
</section>

<style>
	svg {
		width: 100%;
		height: min(35vh, 350px);
		justify-self: center;
	}
</style>