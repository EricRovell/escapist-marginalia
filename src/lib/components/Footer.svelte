<!--
  @component
  Footer Component  
-->
<footer>
  <div class="wrapper">
    <slot />
  </div>
</footer>

<style>
  footer {
    grid-area: footer;
    
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: var(--spacing-rem-6, 1.5rem) var(--spacing-rem-2, 0.5rem);
    background: var(--color-surface-300);
  }

  .wrapper {
    display: grid;
    grid-template: 1fr / repeat(2, auto);
    align-items: center;
    gap: var(--spacing-6);
    width: 100%;
    height: 100%;

    justify-self: center;
    max-width: var(--max-width);
  }

  @media (max-width: 540px) {
    .wrapper {
      grid-template: repeat(2, 1fr) / 1fr;
      justify-items: center;
    }
  }
</style>