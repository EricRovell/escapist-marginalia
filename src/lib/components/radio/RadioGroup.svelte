<script lang="ts" context="module">
  interface RadioItem {
    value: string | number;
    label?: string;
    disabled?: boolean;
  }
</script>

<script lang="ts">
  import RadioButton from "./RadioButton.svelte";
  
  export let items: RadioItem[] = [];
  export let current: string | number | null = null;
  export let name: string;
  export let legend: string;
</script>

{#if items && items.length}
  <fieldset>
    <legend>{legend}</legend>
    {#each items as { value, label, disabled } (value)}
      <RadioButton
        bind:group={current}
        {value}
        {disabled}
        {label}
        {name}
      />
    {/each}
  </fieldset>
{/if}

<style>
  fieldset {
    --border-color: var(--color-3);
    --border-radius: var(--radius-small);

    
    padding: 0.75em;
    border-radius: 5px;
    
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
  
  fieldset:focus-within {
    border-color: red;
  }
</style>