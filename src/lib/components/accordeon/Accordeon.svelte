<script lang="ts">
  import Details from "../layout/Details.svelte";
  import type { AccordeonItems } from "./types";
  
  export let items: AccordeonItems = [];
</script>

<ul>
  {#each items as { open, items, label, href }}
    {#if items}
      <Details {open} title={label} type="accordion">
        <svelte:self {items} />
      </Details>
    {:else}
      <a {href}>
        {label}
      </a>
    {/if}
  {/each}
</ul>