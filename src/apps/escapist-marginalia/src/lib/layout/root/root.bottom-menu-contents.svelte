<script>
	import { page } from "$app/stores";
	import { Navigation, NavigationItem } from "ui";

	import {
		pathHome,
		pathWriting,
		pathGallery,
		pathProjects,
		pathSketch,
		pathBookmarks,
		pathAbout
	} from "@paths";
	import { t } from "@core/i18n";
	import styles from "./root-side-menu.module.css";

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

<section label="nav" class="{styles.nav}">
	<Navigation>
		{#each menuItems as { href, pattern, label }}
			<NavigationItem {href} {pattern} pathname="{$page.url.pathname}">
				{label}
			</NavigationItem>
		{/each}
	</Navigation>
</section>
