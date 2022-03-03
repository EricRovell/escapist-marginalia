<script lang="ts">
  import { pathHome, pathBlog, pathGallery, pathProjects, pathAbout } from "@paths";
  import { t } from "@core/i18n";
  import { Navigation, Footer, Icon, ThemeSelect, Masthead, LangSelect, Link } from "../components";
  import { logo } from "@components/icons/logo";
  import styles from "./root.module.css";

  import "@styles/utility.css";
  import "@styles/tokens.css";
  import "@styles/normalize.css";
  import "@styles/theme-dark.css";
  import "@styles/theme-light.css";
  import "@styles/typography.css";
</script>

<div class={styles.app}>
  <Masthead>
    <svelte:fragment slot="logo">
      <Link href={$pathHome}>
        <Icon path={logo} size="25px" />
      </Link>
    </svelte:fragment>
    <svelte:fragment slot="navigation">
      <Navigation.Container>
        <Navigation.Item href={$pathHome} pattern={/\/home/}>
          {$t("sections.home")}
        </Navigation.Item>
        <Navigation.Item href={$pathBlog} pattern={/\/blog|\/content/}>
          {$t("sections.blog")}
        </Navigation.Item>
        <Navigation.Item href={$pathGallery} pattern={/\/gallery/}>
          {$t("sections.gallery")}
        </Navigation.Item>
        <Navigation.Item href={$pathProjects}>
          {$t("sections.projects")}
        </Navigation.Item>
        <Navigation.Item href={$pathAbout} disabled>
          {$t("sections.about")}
        </Navigation.Item>
      </Navigation.Container>
    </svelte:fragment>
    <svelte:fragment slot="controls">
      <LangSelect />  
      <ThemeSelect />
    </svelte:fragment>
  </Masthead>
	<section label="content" class={styles.content}>
		<slot />
	</section>
	<Footer />
</div>