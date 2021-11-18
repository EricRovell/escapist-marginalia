<script lang="ts">
  import { pathHome, pathBlog, pathGallery, pathProjects, pathAbout } from "@paths";
  import { _ } from "@core/i18n";
  import { Navigation, Footer, Icon, ThemeSelect, Masthead, LangSelect } from "../components";
  import { iconTelescope } from "@components/icons/default";

  import "@styles/tokens.css";
  import "@styles/normalize.css";
  import "@styles/theme-dark.css";
  import "@styles/theme-light.css";
  import "@styles/typography.css";
</script>

<div id="app">
  <Masthead>
    <a class="logo" href={$pathHome} slot="logo">
      <Icon path={iconTelescope} />
      <span>eric/rovell</span>
    </a>
    <svelte:fragment slot="navigation">
      <Navigation.Container>
        <Navigation.Item href={$pathHome} pattern={/\/home/}>
          {$_("sections.home")}
        </Navigation.Item>
        <Navigation.Item href={$pathBlog} pattern={/\/blog|\/content/}>
          {$_("sections.blog")}
        </Navigation.Item>
        <Navigation.Item href={$pathGallery} pattern={/\/gallery/} disabled>
          {$_("sections.gallery")}
        </Navigation.Item>
        <Navigation.Item href={$pathProjects}>
          {$_("sections.projects")}
        </Navigation.Item>
        <Navigation.Item href={$pathAbout} disabled>
          {$_("sections.about")}
        </Navigation.Item>
      </Navigation.Container>
    </svelte:fragment>
    <svelte:fragment slot="controls">
      <LangSelect />  
      <ThemeSelect />
    </svelte:fragment>
  </Masthead>
	<section label="content" class="content">
		<slot />
	</section>
	<Footer />
</div>

<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    line-height: 1.0;

    position: relative;
  }
  
  #app {
    --max-width: 1440px;
    width: 100%;
    
    font-family: var(--font-main);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 1 0%;
  }

  .content {
    display: grid;
    grid-auto-rows: min-content;
    place-items: start start;
    width: min(100%, var(--max-width));
    min-height: calc(100vh - 50px);
    margin: 15vh 0;
  }

  /* let bottom menu be full width */
  @media screen and (max-width: 640px) {
    #app {
      padding: 0;
    }
  }
</style>