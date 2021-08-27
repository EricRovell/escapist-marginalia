<script>
  /* eslint-disable no-undef */
</script>

<!--
  @component
  Website Masthead Component
  Provides a structured wrapper for header contents.
  
  Usage:
    ```
      <Masthead>
        <Item slot="logo" />
        <Item slot="navigation" />
        <Item slot="controls" />
      </Masthead>
    ```
    
  Props:
    
    | Name | type | default | description |
    |:-----|:-----|:--------|:------------|
    |   -  |   -  |    -    |      -      |
      
  Slots:
  
    | Name       | fallback | description                                                        |
    |:-----------|:---------|:-------------------------------------------------------------------|
    | logo       | -        | Slot for website logo, placed at the left.                         |
    | navigation | -        | Slot for navigational links, placed at the right, before controls. |
    | controls   | -        | Slot for the controls (buttons, switches), placed at the right.    |
-->
<header>
  {#if $$slots.logo}
    <section label="logo">
      <slot name="logo" />
    </section>
  {/if}
  {#if $$slots.navigation}
    <section label="navigation">
      <slot name="navigation" />
    </section>
  {/if}
  {#if $$slots.controls}
    <section label="controls">
      <slot name="controls" />
    </section>
  {/if}
</header>

<style>
  header {
    grid-area: masthead;
    
    display: grid;
    grid-template: 1fr / repeat(3, 1fr);
    grid-template-areas: "logo navigation controls";
    place-items: center;
    gap: var(--spacing-3, 0.75em);

    width: min(100%, var(--max-width));
    height: var(--header-height, 50px);
    padding: 0 var(--spacing-rem-2, 0.5rem);    
    z-index: var(--z-index-navigation);
  }
  
  section[label="logo"] {
    grid-area: logo;
    justify-self: start;
  }
  
  section[label="navigation"] {
    grid-area: navigation;
  }
  
  section[label="controls"] {
    grid-area: controls;
    justify-self: end;
    
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: auto;
    grid-template-rows: 1fr;
    width: max-content;
  }
</style>