<script lang="ts" context="module">
  interface SVGData {
    viewBox: string;
    name: string;
    svg: string;
  }
</script>

<script lang="ts">
  export let className: string | undefined = undefined;
	export let data: SVGData | undefined = undefined;
  export let fill: string | undefined = undefined;
  export let height: string = "1em";
  export let id: string | undefined = undefined;
  export let stroke: string | undefined = undefined;
  export let title: string | undefined = data?.name;
  export let viewBox: string | undefined = data?.viewBox ?? "0 0 100 100";
  export let width: string = "1em";
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
aria-labelledby={title}
	class={className}
  {height}
  {id}
  role="presentation"
  {viewBox}
  {width}
>
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
