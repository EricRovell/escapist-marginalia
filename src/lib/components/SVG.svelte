<script lang="ts" context="module">
  interface SVGData {
    viewBox: string;
    name: string;
    svg: string;
  }
  
  //type SVGIconSizes = undefined | 1 | 1.25 | 1.5 | 1.75 | 2;
</script>

<script lang="ts">
  export let data: SVGData | undefined = undefined;
  
  export let id: string | undefined = undefined;
  export let title: string | undefined = data?.name;
  export let viewBox: string | undefined = data?.viewBox ?? "0 0 100 100";
  
  export let size: string | undefined = undefined;
  export let width: string = size ?? "1em";
  export let height: string = size ?? "1em";
  
  export let stroke: string | undefined = undefined;
  export let fill: string | undefined = undefined;
  
  export let icon = false;
  export let accent = false;
  
  export let mr = false;
  export let ml = false;
</script>

<svelte:options namespace="svg" />

<!--
  @component
  
  SVG composer component.
  
  Usage:
    - With provided svg data:
      ```
        <SVG data={svgData} />
      ```
    - Using slot:
      ```
      <SVG>
        <title>Some title</title>
        <g>
          <circle r="50px" />
        </g>
      </SVG>
      ```
    - Using string data:
    ```
      <SVG data={iconData} />
    ```
  
  Props:
    | Props name | type    | default       | description                         |
    |------------|---------|---------------|-------------------------------------|
    | data       | SVGData | undefined     | SVG string data object              |
    | id         | string  | undefined     | ID of svg node                      |
    | title      | string  | undefined     | self-explanatory                    |
    | viewBox    | string  | "0 0 100 100" | Custom viewBox parameters           |
    | size       | string  | undefined     | Rectangular size                    |
    | width      | string  | 1em           | self-explanatory                    |
    | height     | string  | 1em           | self-explanatory                    |
    | stroke     | string  | undefined     | unary stroke option for entire svg  |
    | fill       | string  | undefined     | unary fill option for entire svg    |
    | icon       | boolean | false         | icon utility class                  |
    | accent     | boolean | false         | current theme accent fill           |
    | mr         | boolean | false         | margin right                        |
    | ml         | boolean | false         | margin left                         |
-->
<svg
  xmlns="http://www.w3.org/2000/svg"
  {id}
  {width}
  {height}
  {viewBox}
  aria-labelledby={title}
  role="presentation"
  class:icon
  class:accent
  class:mr
  class:ml>
    {#if data}
      <title>
        {title}
      </title>
      <g {stroke} {fill}>
        {@html data.svg}
      </g>
    {:else}
      <slot />
    {/if}
</svg>

<style>
  svg {
    transition: transform 0.25s ease-in-out;
  }
  
  .icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
  
  .accent {
    fill: var(--color-primary);
  }
  
  .mr {
    margin-right: 0.4em;
  }
  
  .ml {
    margin-left: 0.4em;
  }
</style>