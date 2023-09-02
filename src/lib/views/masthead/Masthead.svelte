<script lang="ts">
	import {
		pathHome,
		pathWriting,
		pathGallery,
		pathProjects,
		pathBookmarks,
		pathSketch,
		pathAbout
	} from "@paths";
	import { t } from "@core/i18n";

	import { Button, Menu as Navigation, Icon, Link } from "@components";
	import { iconGear, iconLogo } from "@icons";
	import { PreferencesModal } from "..";
	import styles from "./masthead.module.css";

	const menuItems = [
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

	let showModal = false;
</script>

<header class={`container ${styles.masthead}`}>
	<section data-label="logo">
		<Link block href={$pathHome} aria-label="Escapist Marginalia Logo">
			<Icon path={iconLogo} />
		</Link>
	</section>
	<section data-label="navigation">
		<Navigation.Container>
			{#each menuItems as { href, pattern, label }}
				<Navigation.Item {href} {pattern}>
					{label}
				</Navigation.Item>
			{/each}
		</Navigation.Container>
	</section>
	<section data-label="controls">
		<Button on:click={() => showModal = !showModal} icon appearance="outline">
			<Icon path="{iconGear}" />
		</Button>
	</section>
</header>

<PreferencesModal
	bind:open={showModal}
/>
