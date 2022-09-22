<script lang="ts">
	import { Button, Drawer, MenuIndicator, Masthead, Footer } from "@components";
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
	<Drawer
		className="{styles.sidemenu}"
		hidden
		let:toggle
		let:show
	>
		<svelte:fragment slot="label">
			{$t("dict.menu")}
		</svelte:fragment>
		<MobileNav />
		<svelte:fragment slot="toggle">
			<Button
				className="{styles["menu-switch"]}"
				on:click="{toggle}"
			>
				<MenuIndicator active="{show}" />
				Menu
			</Button>
		</svelte:fragment>
	</Drawer>
	<div class={styles.content}>
		<slot />
	</div>
	<Footer />
</div>
