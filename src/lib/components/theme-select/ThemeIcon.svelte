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
				y: radius * Math.sin(2 * Math.PI * i / vertices)
			};
		}

		return coords;
	}
</script>

<script lang="ts">
  import type { Theme } from "@stores";
  import styles from "./theme-icon.module.css";

  export let maskID = Math.random().toString().substr(2, 8);
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
  class="{styles.icon} {theme}">
	<defs>
		<mask class={styles.mask} id="theme-toggle-mask-{maskID}">
			<rect fill="white" x="0" y="0" width="100" height="100" />
			<circle fill="black" cx="50" cy="50" r={sunSize / 2} />
			<path fill="black" d="M50,50 L50,0 A50,50 1 0,1 50,100z" />
		</mask>
	</defs>
	<circle class={styles.center} mask="url(#theme-toggle-mask-{maskID})" cx="50" cy="50" r={sunSize} />

	<g class={styles.rays}>
		{#each verticesCoords(rays, rayOffset) as { x, y }}
			<circle cx={cx + x} cy={cy + y} r={raySize}/>
		{/each}
	</g>
</svg>
