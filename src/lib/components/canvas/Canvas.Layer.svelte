<script lang="ts">
  import { getContext, onDestroy } from "svelte";
  import { KEY } from "./Canvas.svelte";
  import type { RenderFunction, RenderManager } from "./canvas.types";

  export let id: string;
  export let draw: RenderFunction | undefined = undefined;
  export let setup: RenderFunction | undefined = undefined;

  const manager = getContext<RenderManager>(KEY);

  manager.register(id, { setup, draw });

  onDestroy(() => manager.unregister(id));

  $: draw, manager.redraw();
</script>
