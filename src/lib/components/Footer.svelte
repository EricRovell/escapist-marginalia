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
    padding: var(--space-l) var(--space-s);
    background: var(--color-surface-300);
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    gap: var(--space-l);
    width: 100%;
    height: 100%;

    justify-self: center;
    width: min(100%, calc(var(--max-width) + 2 * var(--space-s)));
  }

  footer a {
    color: var(--color-primary);
  }

  section[label="info"] {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
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