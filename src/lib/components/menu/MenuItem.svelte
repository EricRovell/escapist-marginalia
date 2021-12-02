<script lang="ts">
  import { getContext } from "svelte";
  import Link from "../Link.svelte"; 
  import { active } from "./active";
  import styles from "./menu.module.css";

  import type { MenuContext } from "./Menu.svelte";
  
  export let href = "";
  export let disabled = false;
  export let pattern: RegExp | null = null;
  
  const page = getContext<MenuContext>("page");
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
<li class={styles["menu-item"]} use:active={{ current: $page.path, pattern }}>
  <Link {href} {disabled}>
    <slot />
  </Link>
</li>