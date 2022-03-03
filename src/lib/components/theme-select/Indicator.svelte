<script lang="ts" context="module">
	interface Coordinate {
		x: number;
		y: number;
	}

	/**
   * Generates the vertices coordinates of the reqular polygon.
   * ! The offset is not taken into account
  */
	function verticesCoords(vertices: number, radius: number) {
		const coords: Coordinate[] = new Array<Coordinate>(vertices);
    
		for (let i = 0; i < vertices; i++) {
			coords[i] = {
				x: radius * Math.cos(2 * Math.PI * i / vertices),
				y: radius * Math.sin(2 * Math.PI * i / vertices),
			};
		}
    
		return coords;
	}
</script>

<script lang="ts">
  import type { Theme } from "@stores";
  
  export let theme: Theme;
  export let sunSize = 25;
  export let raySize = 5;
  export let rayOffset = 40;
  export let rays = 8;
  
  const cx = 50;
  const cy = 50;
</script>

<!--
  Props:
    
    | Name      | type | default                   | description                            |
    |:----------|:-------|:------------------------|:---------------------------------------|
    | sunSize   | number | 25                      | The sun's radius                       |
    | raySize   | number | 5                       | The ray's radius                       |
    | rayOffset | number | 40                      | The rays' offset from the sun's center |
    | rays      | number | 8                       | the number of rays                     |
-->
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  class="indicator {theme}">
	<defs>
		<mask class="mask" id="theme-toggle-mask">
			<rect fill="white" x="0" y="0" width="100" height="100" />
			<circle fill="black" cx="50" cy="50" r={sunSize / 2} />
		</mask>
	</defs>
	<circle class="center" mask="url(#theme-toggle-mask)" cx="50" cy="50" r={sunSize} />
	<g class="rays">
		{#each verticesCoords(rays, rayOffset) as { x, y }}
			<circle cx={cx + x} cy={cy + y} r={raySize}/>
		{/each}
	</g>
</svg>

<style>
  .indicator {
    fill: var(--accent);
    width: 100%;
    height: 100%;
  }

  .rays {
    transition-property: transform, opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease-in-out;
    transform-origin: 50% 50%;
    opacity: 0;
  }

  .mask circle {
    transition: transform 0.45s ease-in-out 0.2s;
    transform-origin: 50% 50%;
    transform: scale(0) translate(6%, -5%);
  }

  .center {
    transition: transform 0.45s ease-in-out 0.2s;
    transform-origin: 50% 50%;
  }

  /* light theme */

  .indicator:global(.light) .rays {
    transform: rotate(90deg) scale(1);
    opacity: 1;
  }

  /* dark theme */

  .indicator:global(.dark) > .center {
    fill: gold;
  }

  .indicator:global(.dark) .mask circle {
    transform: scale(2) translate(6%, -5%);
  }

  .indicator:global(.dark) > .center {
    transform: scale(1.5);
  }

  /* auto theme */

  .indicator:global(.auto) > .center {
    fill: var(--color-primary);
    transform: scale(1.5);
  }

  .indicator:global(.auto) .mask circle {
    transform: scale(1.5);
  }
</style>