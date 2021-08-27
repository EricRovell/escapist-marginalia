<script lang="ts">
  import { page } from "$app/stores";  
  import { setContext } from "svelte";
  
  export let wide = false;
  export let border = false;
  export let spacing: undefined | "equal" = undefined;
  
  setContext("page", page);
</script>

<!--
  @component
  Menun Component
  Wrapper component for navigational links.
  
  Usage:
    ```
      <Menu>
        <MenuItem />
        <MenuItem />
      </Menu>
    ```
    
  Props:
  
    | Name        | type              | default  | description                                                                        |
    |:------------|:------------------|:---------|:-----------------------------------------------------------------------------------|
    | wide        | boolean?          | false    | Element will take all the available width.                                         |
    | noBorder    | boolean?          | false    | Removes the bottom border from element.                                            |
    
  Context:
    - "page": sapper page store;
-->
<nav class:border class:wide>
  <ul class:equal-spacing={spacing === "equal"}>
    <slot />
  </ul>
</nav>

<style>
  nav {
    --navigation-height: 50px;
  }
  
  ul {
    display: inline-grid;
    place-items: center;
    place-content: center start;
    grid-auto-flow: column;
    gap: var(--spacing-3, 0.75em);
    
    width: fit-content;
    height: var(--navigation-height);
  }
  
  .border {
    border-bottom: var(--border-1);
  }
  
  .wide {
    width: 100%;
  }
  
  .wide > ul {
    display: grid;
    width: 100%;
  }
  
  .equal-spacing {
    grid-auto-columns: 1fr;
  }
</style>