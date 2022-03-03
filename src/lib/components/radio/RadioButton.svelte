<script lang="ts">
  export let value: string;
  export let group: string[];
  export let disabled = false;
  export let title: string | undefined = undefined;
  export let label: string | undefined = undefined;
  export let name: string;
</script>

<!--
  @component
  Radio Button
-->
<label {title}>
  <input
    type="radio"
    bind:group
    {value}
    {disabled}
    {name}
    on:change
  />
  <span>{label}</span>
</label>

<style>
  label {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    position: relative;
    user-select: none;
    cursor: pointer;
  }
  
  label:focus-within {
    color: red;
  }
</style>