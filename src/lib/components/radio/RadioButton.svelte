<script lang="ts">
  import { getContext } from "svelte";
  import styles from "./radio.module.css";

  export let value: string;
  export let disabled = false;
  export let title: string | undefined = undefined;

  const { name } = getContext("name");
</script>

<label class="{styles.label}" {title}>
  <input
    type="radio"
    {value}
    {disabled}
    {name}
    on:change
  />
  <span>
    <slot />
  </span>
</label>
