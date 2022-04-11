<script lang="ts">
  import { Masthead, Footer } from "@components";

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
	<div class={styles.content}>
		<slot />
	</div>
	<Footer />
</div>