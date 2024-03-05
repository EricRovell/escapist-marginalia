<script lang="ts">
	import { page } from "$app/stores";
	import { Button, Icon, Link, Navigation, NavigationItem } from "ui";
	import { iconGear, iconLogo } from "ui/icons";

	import { t } from "@core/i18n";
	import {
		pathHome,
		pathWriting,
		pathGallery,
		pathProjects,
		pathBookmarks,
		pathSketch,
		pathAbout
	} from "@paths";
	import { PreferencesModal } from "..";
	import styles from "./masthead.module.css";

	let showModal = false;

	$: menuItems = [
		{
			href: $pathHome,
			pattern: /\/home/,
			label: $t("sections.home")
		},
		{
			href: $pathWriting,
			pattern: /\/writing/,
			label: $t("sections.writing")
		},
		{
			href: $pathGallery,
			pattern: /\/gallery/,
			label: $t("sections.gallery")
		},
		{
			href: $pathProjects,
			pattern: /\/projects/,
			label: $t("sections.projects")
		},
		{
			href: $pathSketch,
			pattern: /\/sketch/,
			label: $t("sections.sketch")
		},
		{
			href: $pathBookmarks,
			pattern: /\/bookmarks/,
			label: $t("sections.bookmarks")
		},
		{
			href: $pathAbout,
			pattern: /\/about/,
			label: $t("sections.about")
		}
	];
</script>

<header class={`container ${styles.masthead}`}>
	<section data-label="logo">
		<Link block href={$pathHome} aria-label="Escapist Marginalia Logo">
			<Icon path={iconLogo} />
		</Link>
	</section>
	<section data-label="navigation">
		<Navigation>
			{#each menuItems as { href, pattern, label }}
				<NavigationItem {href} {pattern} pathname="{$page.url.pathname}">
					{label}
				</NavigationItem>
			{/each}
		</Navigation>
	</section>
	<section data-label="controls">
		<Button
			on:click={() => showModal = !showModal}
			aria-label="{$t("dict.settings")}"
			icon
		>
			<Icon path="{iconGear}" />
		</Button>
	</section>
</header>

<PreferencesModal
	bind:open={showModal}
/>
