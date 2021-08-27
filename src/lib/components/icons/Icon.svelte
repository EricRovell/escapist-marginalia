<script lang="ts">
  import type { Variant } from "@types";

  export let id: string | undefined = undefined;
  export let title: string | null = null;
  export let viewBox = "0 0 100 100";
  
  export let path: string | undefined = undefined;
  export let markup: string | undefined = undefined;
  export let color: Variant | string = ""; 
  export let size = "1em";
  export let margin = "0";
  
  export let style = "";
</script>

<svelte:options namespace="svg" />

<!--
  @component
  
  SVG Icon component.
  
  Usage:
    ```
      <Icon {path} color="success" title="Success message" />
    ```
  
  Props:
    | Props name | type    | default       | description                                         |
    |------------|---------|---------------|-----------------------------------------------------|
    | path       | string  | required      | SVG path data string                                |
    | id         | string  | undefined     | SVG's node ID                                       |
    | title      | string  | null          | self-explanatory                                    |
    | viewBox    | string  | "0 0 100 100" | Custom viewBox parameters                           |
    | size       | string  | "1em"         | Rectangular size                                    |
    | margin     | string  | "0"           | Margin CSS string                                   |
    | color      | Variant | currentColor  | Icon's fill color, default to inherited color value |
-->
<svg
  xmlns="http://www.w3.org/2000/svg"
  {id}
  {viewBox}
  style={`--icon-margin: ${margin}; ${color ? `--icon-color: var(--color-${color});` : ""} ${style}`}
  width={size}
  height={size}
  aria-labelledby={title ?? null}
  role="presentation">
    {#if title}
      <title>{title}</title>
    {/if}
    {#if path}
      <path d={path} />
    {/if}
    {#if markup}
      <g>{@html markup}</g>
    {/if}
</svg>

<style>
  svg {
    fill: var(--icon-color, currentColor);
    margin: var(--icon-margin, 0);
  }
</style>