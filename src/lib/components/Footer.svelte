<script>
  import Link from "./Link.svelte";
  import NavLocale from "./nav-locale/NavLocale.svelte";
  import { t } from "@core/i18n";
  import { version } from "../../../package.json";

  import {
  	pathSource,
  	pathLicence,
  	pathPrivacy,
  	pathBlog,
  	pathGallery,
  	pathAbout
  } from "@core/paths";

  $: links = [
  	{ label: "blog", href: $pathBlog },
  	{ label: "gallery", href: $pathGallery },
  	{ label: "source", href: pathSource },
  	{ label: "licence", href: pathLicence },
  	{ label: "privacy", href: pathPrivacy, disabled: true },    
  	{ label: "about", href: $pathAbout, disabled: true }
  ];
</script>

<footer>
  <div class="container wrapper">
    <nav>
      <ul>
        {#each links as { label, href, disabled = false }}
          <li>
            <Link {href} {disabled}>
              {$t(`sections.${label}`)}
            </Link>
          </li>
        {/each}
      </ul>
    </nav>
    <section label="user">
      <span>
        © {new Date().getFullYear()} Eric/Rovell, v.{version}
      </span>
      <NavLocale />
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
    background: var(--surface-2);
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-m);
    width: 100%;
    height: 100%;
    padding-top: var(--space-l);
    padding-bottom: var(--space-l);

    justify-self: center;
  }

  section[label="user"] {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    font-size: var(--font-size-m);
    color: hsl(var(--gray-h) var(--gray-s-700) var(--gray-l-700));
  }

  nav ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
    color: var(--color-primary);
    text-transform: capitalize;
    gap: var(--space-m);
  }

  @media (max-width: 540px) {
    .wrapper {
      grid-template: repeat(2, 1fr) / 1fr;
      justify-items: center;
    }
  }

  @media (max-width: 650px) {
    .wrapper {
      /* floating button offset */
      padding-bottom: 6rem;
    }
  }
</style>