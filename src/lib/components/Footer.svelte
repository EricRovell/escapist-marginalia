<script>
  import { version, homepage } from "../../../package.json";
</script>

<footer>
  <div class="wrapper">
    <section label="info">
      <span>
        © {new Date().getFullYear()} eric/rovell, {version}
      </span>
      <span>
        CC BY-NC-SA 4.0 Licence
      </span>
    </section>
    <section label="links">
      <a href={homepage}>
        Github
      </a>
    </section>
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
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-6);
    width: 100%;
    height: 100%;

    justify-self: center;
    max-width: var(--max-width);
  }

  footer a {
    color: var(--color-primary);
  }

  section[label="info"] {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  section[label="links"] {
    display: flex;
    align-items: flex-end;
  }

  @media (max-width: 540px) {
    .wrapper {
      grid-template: repeat(2, 1fr) / 1fr;
      justify-items: center;
    }
  }
</style>