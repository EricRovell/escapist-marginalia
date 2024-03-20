<script lang="ts">
	import { Button, Drawer, Icon, IconMenu, Link } from "ui";
	import { iconLogo, iconGear } from "ui/icons";

	import { pathHome } from "@paths";
	import BottomMenuContents from "./root.bottom-menu-contents.svelte";
	import { PreferencesLanguage, PreferencesTheme } from "@views";

	import styles from "./root-side-menu.module.css";

	let showNavigation = false;
	let showUserPreferences = false;

	const toggleNavigation = () => showNavigation = !showNavigation;
	const togglePreferences = () => showUserPreferences = !showUserPreferences;
</script>

<header class="{styles["bottom-menu"]}">
	<Link block href={$pathHome} aria-label="Escapist Marginalia Logo">
		<Icon path={iconLogo} /> Escapist Marginalia
	</Link>
	<Drawer
		bind:show="{showNavigation}"
		className="{styles.sidemenu}"
		name="navigation"
	>
		<h2 slot="header">Navigation</h2>
		<BottomMenuContents />
	</Drawer>
	<Drawer
		bind:show="{showUserPreferences}"
		className="{styles.sidemenu}"
		name="preferences"
	>
		<h2 slot="header">User Preferences</h2>
		<form
			class="{styles.preferences}"
			on:submit|preventDefault
		>
			<PreferencesLanguage />
			<PreferencesTheme />
		</form>
	</Drawer>
	<Button on:click={togglePreferences} icon appearance="ghost">
		<Icon path="{iconGear}" />
	</Button>
	<Button
		className="{styles["bottom-menu-switch"]}"
		on:click="{toggleNavigation}"
		icon
		appearance="ghost"
	>
		<IconMenu active="{showNavigation}" />
	</Button>
</header>
