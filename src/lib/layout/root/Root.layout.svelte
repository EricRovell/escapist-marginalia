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

	let show = false;
	const toggle = () => show = !show;
</script>

<div class={styles.app} id="app">
	<Masthead />
	<Drawer
		bind:show
		className="{styles.sidemenu}"
		hidden
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
