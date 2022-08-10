<script lang="ts">
  import { Masthead, Footer, SideMenu } from "@components";
  import MobileNav from "./Root.SideMenuBody.svelte";
  import { t } from "@core/i18n";

  import "@styles/utility.css";
  import "@styles/tokens.css";
  import "@styles/normalize.css";
  import "@styles/theme-dark.css";
  import "@styles/theme-light.css";
  import "@styles/typography.css";

  import styles from "./root.module.css";
</script>

<div class={styles.app}>
  <Masthead />
  <SideMenu>
    <svelte:fragment slot="title">
      {$t("dict.menu")}
    </svelte:fragment>
    <MobileNav />
  </SideMenu>
	<div class={styles.content}>
		<slot />
	</div>
	<Footer />
</div>