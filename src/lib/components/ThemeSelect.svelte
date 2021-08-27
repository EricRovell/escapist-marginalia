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
  import { theme } from "@stores";
  
  export let title = "Click to switch theme";
  export let size: string | undefined = undefined;
  export let sunSize = 25;
  export let raySize = 5;
  export let rayOffset = 40;
  export let rays = 8;
  
  // center
  const cx = 50;
  const cy = 50;
  
  // dynamically set theme on root to change the theme custom properties
  $: if (globalThis.window) {
  	document.documentElement.setAttribute("theme", $theme);
  }
</script>

<!--
  @component
  Theme Toggle component.
  Toggles the web site color mode: between light and dark.
  
  Usage:
    ```
      <ThemeToggle size="50px" />
    ```
  
  Props:
    
    | Name      | type | default                   | description                            |
    |:----------|:-------|:------------------------|:---------------------------------------|
    | title     | string | "Click to switch theme" | The toggle's title                     |
    | size      | string | 1em                     | The toggle's size                      |
    | sunSize   | number | 25                      | The sun's radius                       |
    | raySize   | number | 5                       | The ray's radius                       |
    | rayOffset | number | 40                      | The rays' offset from the sun's center |
    | rays      | number | 8                       | the number of rays                     |
-->
<label style={size ? `--toggle-size: ${size}` : ""}>
  <input type="checkbox" checked={$theme === "light"} on:change={theme.change}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <title>{title}</title>
    <defs>
      <mask id="theme-toggle-mask">
        <rect fill="white" x="0" y="0" width="100" height="100" />
        <circle fill="black" cx="65" cy="40" r="25"/>
      </mask>
    </defs>
    <circle mask="url(#theme-toggle-mask)" cx="50" cy="50" r={sunSize} style="stroke-miterlimit: 10;stroke-width: 8px"/>
    <g class="rays">
      {#each verticesCoords(rays, rayOffset) as { x, y }}
        <circle cx={cx + x} cy={cy + y} r={raySize}/>
      {/each}
    </g>
  </svg>
</label>

<style>
  label {
    width: var(--toggle-size, 1em);
    height: var(--toggle-size, 1em);
    padding: 1px;
    box-shadow: 0 0 0 var(--focus-ring-size) var(--focus-ring-color);
    border-radius: var(--radius-medium);
    
    transition: box-shadow 0.15s linear;
    cursor: pointer;
  }
  
  label:focus-within {
    --focus-ring-size: 1.5px;
  }

  input {
    position: absolute;
    opacity: 0;
  }

  svg {
    fill: gold;
    width: var(--toggle-size, 1em);
    height: var(--toggle-size, 1em);
  }

  svg .rays {
    transition-property: transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    transform-origin: 50% 50%;
  }

  svg #theme-toggle-mask circle {
    transform: rotate(90deg) scale(0);
    transition: transform 0.45s ease-in-out 0.2s;
    transform-origin: 75% 35%;
  }

  svg > circle {
    transition: transform 0.45s ease-in-out 0.2s;
    transform-origin: 50% 50%;
  }

  input:checked + svg > circle {
    fill: #b5b5c4;
  }

  input:checked + svg .rays {
    transform: rotate(90deg) scale(0.5);
    opacity: 0;
  }

  input:checked + svg #theme-toggle-mask circle {
    transform: rotate(0) scale(1);
  }

  input:checked + svg > circle {
    transform: scale(1.5);
  }
</style>