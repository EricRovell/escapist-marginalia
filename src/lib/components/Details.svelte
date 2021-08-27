<script lang="ts" context="module">
  export type DetailsType = "dropdown" | "accordion" | "button" | "button-fill";
</script>

<script lang="ts">
  export let title: string | undefined = "Show/Hide";
  export let open = false;
  export let type: DetailsType = "dropdown";
</script>

<!--
  @component
  Details Component
  
  Creates a disclosure widget in which information is visible only
  when the widget is toggled into an "open" state.
  
  Usage:
    ```
      <Details open>
        <p>You can hide me!</p>
      </Details>
    ```
  
  Props:
  
    | Name  | type        | default   | description |
    |:------|:------------|:----------|:------------|
    | title | string      | Show/Hide | The label of the disclosure widget.                                                                          |
    | open  | boolean     | false     | The current disclosure state.                                                                                |
    | type  | DetailsType | dropdown  | The widget's type. "dropdown" is good for default, "accordion" for content menu, "button" for context menus. |
    
  Slots:
  
    | Name    | default          | Purpose                                                                      |
    |:--------|:-----------------|:-----------------------------------------------------------------------------|
    | icon    | svg chevron icon | The icon located to the left inside summary, indicates the disclosure state. |
    | title   | title prop value | The custom label for the widget.                                             |
    | default | empty            | The contents that should be hidden.                                          |
-->
<details bind:open class={type}>
  <summary>
    <slot name="icon">
      <svg class="default-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.44 100">
        <polygon points="0 4.45 34.16 50 0 95.55 5.94 100 43.44 50 5.94 0 0 4.45"/>
      </svg>
    </slot>
    <slot name="title">
      <span>{title}</span>
    </slot>
  </summary>
  <div class="contents">
    <slot />
  </div>
</details>

<style>
  details {
    display: flex;
    flex-direction: column;
    max-width: 100%;
    
    font-size: inherit;
  }
  
  summary {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: var(--spacing-2) var(--spacing-3);
    width: 100%;
    max-width: 100%;
    
    border-radius: var(--radius-medium);
    box-shadow: 0 0 0 var(--focus-ring-size) var(--focus-ring-color);
    
    user-select: none;
    cursor: pointer;
    
    transition:
      border-color 0.15s linear,
      box-shadow 0.15s linear;
  }
  
  summary > span {
    text-overflow: ellipsis;
    word-wrap: none;
    overflow: hidden;
  }
  
  summary:focus {
    --border-color: var(--color-primary);
    --focus-ring-size: 2px;
    outline: none;
  }
  
  details[open] > summary .default-icon {
    transform: rotate(90deg);
  }
  
  details > summary::marker {
    display: none;
  }
  
  .default-icon {
    fill: var(--color-gray-800);
    width: 0.75em;
    height: 0.75em;
    margin-right: 0.5em;
    
    transition: transform 0.15s ease-in-out;
  }
  
  /* dropdown type */
  .dropdown {
    background: var(--color-surface-500);
    border: var(--border-1);
  }
  
  .dropdown > .contents {
    padding: var(--spacing-2) var(--spacing-3);
  }
  
  .dropdown[open] > .contents {
    border-top: 1px solid var(--border-color);
  }
  
  /* accordion type */
  .accordion summary:hover {
    background-color: var(--color-surface-500);
  }
  
  .accordion > summary {
    border-bottom: none;
  }
  
  .accordion[open] > .contents {
    border-left: 1px solid var(--border-color);
  }
  
  .accordion > .contents {
    /* calc from summary's left padding and icon's half width */
    margin-left: calc(var(--spacing-1) / 2);
    padding: 0.25em 1em;
  }
  
  /* button type */
  details[class^=button] {
    --triangle-size: 1em;
    
    position: relative;
    
    border: 1px solid var(--color-gray-600);
    border-radius: var(--radius-medium);
  }
  
  details[class^=button] > summary svg {
    display: none;
  }
  
  details[class^=button] > .contents {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    
    position: absolute;
    top: calc(100% + var(--triangle-size) + 0.5em);
    left: 50%;
    background-color: var(--color-surface-500);
    
    transform: translateX(-50%);
    
    max-width: 80%;
    padding: 0.5em;
  }
  
  details[class^=button] > .contents::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: var(--triangle-size);
    height: var(--triangle-size);
    background-color: var(--color-surface-500);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    transform: translateX(-50%);
  }
  
  /* button variants */  
  .button-fill summary  {
    background-color: var(--color-surface-500);
  }
</style>