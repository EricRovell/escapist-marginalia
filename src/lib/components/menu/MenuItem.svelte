<script lang="ts" context="module">
  import type { Variant } from "@types";
  //import type { Readable } from "svelte/store";
</script>

<script lang="ts">
  import { getContext } from "svelte";
  import { active } from "./active";
  
  export let href: string;
  export let prefetch: true | undefined = undefined;
  export let pattern: RegExp | null = null;
  export let decorationPosition: "top" | "bottom" = "bottom";
  export let decorationColor: Variant = "primary";
  export let decorationSize = "0.2em";
  
  const page = getContext("page");
</script>

<!--
  @component
  Menu Item component.
  
  Usage:
    ```
      <Menu>
        <MenuItem />
        <MenuItem />
      </Menu>
    ```
    
  Props:
  
    | Name       | type              | default   | description                                                                       |
    |:-----------|:------------------|:----------|:----------------------------------------------------------------------------------|
    | href       | string            | required  | The navigation item hyperlink.                                                    |
    | prefetch   | boolean?          | false     | Controlling the prefetching behaviour of the links.                               |
    | pattern    | RegExp?           | null      | RegExp literal for matching the active state of the current link.                 |
    | decoration | "top" or "bottom" | "bottom"  | Types of underline for links in active state.                                     |    
-->
<li>
  <a
    class="menu-item underline-{decorationPosition}"
    style="--menu-item-decoration-color: var(--color-{decorationColor}); --menu-item-decoration-size: {decorationSize}"
    {href}
    use:active={{ current: $page.path, pattern }}
    sapper:prefetch={prefetch}>
      <slot />
  </a>
</li>

<style>
  .menu-item {
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: var(--color-gray-600);
    cursor: pointer;
    
    display: flex;
    justify-content: center;
    align-items: center;
    /* gap: 0.5em; */
    height: var(--navigation-height);
    
    text-transform: capitalize;

    position: relative;
  }
  
  .menu-item:hover {
    color: var(--color-gray-800);
  }
  
  .menu-item::after {
    content: "";
    position: absolute;
    left: 50%;
    width: var(--menu-item-decoration-size, 0.2em);
    height: var(--menu-item-decoration-size, 0.2em);
    border-radius: 50%;
    background: var(--color-gray-900);
    transform-origin: 0 100%;
    transition: transform 0.25s ease-in-out;
    transform: scaleY(0);
  }

  .menu-item.underline-bottom::after {
    transform-origin: 0 100%;
    bottom: 15%;
  }
  
  .menu-item.underline-top::after {
    transform-origin: 100% 0%;
    top: 0;
  }
  
  li :global(.menu-item[aria-current]) {
    color: var(--color-gray-900);
  }

  li :global(.menu-item[aria-current]::after) {
    transform: scaleY(1);
  }
</style>