<script lang="ts">
	export let cropFactor = 1;
	export let focalLength = 50;
	export let height = 24;
	//export let width = 36;
	export let depth = 1;

	const viewBox = {
		x: 0,
		y: 0,
		width: 75,
		height: 50
	};

	const rightEdgeOffset = 3;
	$: sensorFull = {
		x: viewBox.width - depth,
		y: viewBox.height / 2 - height / 2,
		width: depth,
		height
	};
	$: sensorCrop = {
		x: sensorFull.x,
		y: viewBox.height / 2 - height / cropFactor / 2,
		width: depth,
		height: height / cropFactor
	};
	$: focalPoint = {
		x: viewBox.width - focalLength,
		y: viewBox.height / 2,
		r: 0.25
	};
	$: coefSimilarity = (viewBox.width - focalLength + 2 * depth) / focalLength;
	$: initialRaysOffset = sensorCrop.height / 2 * coefSimilarity
</script>

<svg
	viewBox="{viewBox.x} {viewBox.y} {viewBox.width + rightEdgeOffset} {viewBox.height}"
	xmlns="http://www.w3.org/2000/svg"
	style="border: 1px solid yellow; border-radius: 15px; aspect-ratio: 3 / 2;"
>
	<rect
		class="sensor-fullframe"
		x="{sensorFull.x}"
		y="{sensorFull.y}"
		width="{sensorFull.width}"
		height="{sensorFull.height}"
		fill="red"
	/>
	<rect
		class="sensor-crop"
		x="{sensorCrop.x}"
		y="{sensorCrop.y}"
		width="{sensorCrop.width}"
		height="{sensorCrop.height}"
		fill="yellow"
	/>
	<circle
		cx="{focalPoint.x}"
		cy="{focalPoint.y}"
		r="{focalPoint.r}"
		fill="rgb(255 255 255 / 0.75)"
	/>
	<line
		x1="{sensorCrop.x}"
		y1="{sensorCrop.y}"
		x2="{0}"
		y2="{viewBox.height / 2 + initialRaysOffset}"
		stroke="yellow"
		stroke-width="0.1"
		stroke-dashoffset="0.1"
	/>
	<line
		x1="{sensorCrop.x}"
		y1="{sensorCrop.y + sensorCrop.height}"
		x2="{0}"
		y2="{viewBox.height / 2 - initialRaysOffset}"
		stroke="yellow"
		stroke-width="0.1"
		stroke-dashoffset="0.1"
	/>
	<!-- Full frame rays fill -->
	<polygon
		points="
			{sensorFull.x},{sensorFull.y}
			{sensorFull.x},{sensorFull.y + sensorFull.height}
			{focalPoint.x},{focalPoint.y}"
		fill="rgb(200 50 0 / 0.25)"
	/>
	<polygon
		points="
			{0},{viewBox.height / 2 + coefSimilarity * sensorFull.height / 2}
			{0},{viewBox.height / 2 - coefSimilarity * sensorFull.height / 2}
			{focalPoint.x},{focalPoint.y}"
		fill="rgb(200 50 0 / 0.25)"
	/>
	<!-- Cropped frame rays fill -->
	<polygon
		points="
			{sensorCrop.x},{sensorCrop.y}
			{sensorCrop.x},{sensorCrop.y + sensorCrop.height}
			{focalPoint.x},{focalPoint.y}"
		fill="rgb(200 50 0 / 0.25)"
	/>
	<polygon
		points="
			{0},{viewBox.height / 2 + initialRaysOffset}
			{0},{viewBox.height / 2 - initialRaysOffset}
			{focalPoint.x},{focalPoint.y}"
		fill="rgb(200 50 0 / 0.25)"
	/>
</svg>
