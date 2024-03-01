<svelte:options namespace="svg" />

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 625 400" class="root">
	<g class="cells">
		<rect x="225" width="100" height="100"/>
		<rect y="150" width="100" height="100"/>
		<rect x="150" y="150" width="100" height="100"/>
		<rect x="300" y="150" width="100" height="100"/>
		<rect x="450" y="150" width="100" height="100"/>
		<rect x="75" y="300" width="100" height="100"/>
		<rect x="225" y="300" width="100" height="100"/>
		<rect x="375" y="300" width="100" height="100"/>
		<rect x="525" y="300" width="100" height="100"/>
	</g>
	<g class="connection">
		<line x1="275" y1="100" x2="50" y2="150"/>
		<line x1="200" y1="150" x2="275" y2="100"/>
		<line x1="350" y1="150" x2="275" y2="100"/>
		<line x1="500" y1="150" x2="275" y2="100"/>
		<line x1="125" y1="300" x2="350" y2="250"/>
		<line x1="275" y1="300" x2="350" y2="250"/>
		<line x1="425" y1="300" x2="350" y2="250"/>
		<line x1="575" y1="300" x2="350" y2="250"/>
	</g>
	<g class="cells">
		<rect x="50" y="150" width="50" height="50"/>
		<rect x="150" y="150" width="50" height="50"/>
		<rect x="300" y="200" width="50" height="50"/>
		<rect x="500" y="200" width="50" height="50"/>
		<rect x="125" y="350" width="50" height="50"/>
		<rect x="275" y="350" width="50" height="50"/>
		<rect x="425" y="350" width="50" height="50"/>
		<rect x="575" y="350" width="50" height="50"/>
		<rect x="150" y="350" width="25" height="25"/>
		<rect x="275" y="350" width="25" height="25"/>
		<rect x="425" y="375" width="25" height="25"/>
		<rect x="600" y="375" width="25" height="25"/>
	</g>
	<g class="cells">
		<rect x="150" y="350" width="25" height="25"/>
		<rect x="275" y="350" width="25" height="25"/>
		<rect x="425" y="375" width="25" height="25"/>
		<rect x="600" y="375" width="25" height="25"/>
	</g>
	<g class="connector">
		<circle cx="275" cy="100" r="2.2"/>
		<circle cx="50" cy="150" r="2.2"/>
		<circle cx="200" cy="150" r="2.2"/>
		<circle cx="500" cy="150" r="2.2"/>
		<circle cx="350" cy="150" r="2.2"/>
		<circle cx="350" cy="250" r="2.2"/>
		<circle cx="125" cy="300" r="2.2"/>
		<circle cx="275" cy="300" r="2.2"/>
		<circle cx="575" cy="300" r="2.2"/>
		<circle cx="425" cy="300" r="2.2"/>
	</g>
</svg>

<style>
	.root {
		justify-self: center;
		max-width: calc(100% - 2 * var(--space-3));
		max-height: 60vh;
	}

	.cells {
		opacity: 0.5;
		fill: var(--color-blue-500);
	}

	.connection {
		stroke: var(--color-blue-500);
		opacity: 0.5;
	}

	.connector {
		fill: var(--color-blue-500);
	}
</style>
