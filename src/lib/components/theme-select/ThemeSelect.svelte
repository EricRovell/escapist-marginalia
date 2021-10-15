<script lang="ts" context="module">
  export type Theme = "auto" | "light" | "dark";
</script>

<script lang="ts">
  import { theme } from "@stores";
  import Indicator from "./Indicator.svelte";
  
  export let title = "Click to switch theme";
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
<button on:click={theme.change} {title} class="switcher">
	<Indicator
    theme={$theme}
  />
</button>

<style>
  .switcher {
    font-size: 30px;

    width: var(--toggle-size, 1em);
    height: var(--toggle-size, 1em);
    padding: 0.1em;
    border-radius: var(--radius-medium);
    cursor: pointer;

    display: flex;
    place-items: center;
  }

  .switcher:hover,
  .switcher:focus {
    outline: 1px solid var(--color-primary);
  }
</style>