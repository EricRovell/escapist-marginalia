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

	import * as Navigation from "../menu";
	import Icon from "../icons/Icon.svelte";
	import { ThemeSelect } from "../theme-select";
	import LocaleRoute from "../nav-locale/NavLocale.svelte";
	import { Link } from "../link";
	import { logo } from "@components/icons/logo";

	import styles from "./masthead.module.css";
</script>

<header class={`container ${styles.masthead}`}>
	<section data-label="logo">
		<Link block href={$pathHome} aria-label="Escapist Marginalia Logo">
			<Icon path={logo} />
		</Link>
	</section>
	<section data-label="navigation">
		<Navigation.Container>
			<Navigation.Item href={$pathHome} pattern={/\/home/}>
				{$t("sections.home")}
			</Navigation.Item>
			<Navigation.Item href={$pathWriting} pattern={/\/blog|\/content/}>
				{$t("sections.writing")}
			</Navigation.Item>
			<Navigation.Item href={$pathGallery} pattern={/\/gallery/}>
				{$t("sections.gallery")}
			</Navigation.Item>
			<Navigation.Item href={$pathProjects} pattern={/\/projects/}>
				{$t("sections.projects")}
			</Navigation.Item>
			<Navigation.Item href={$pathSketch} pattern={/\/sketch/}>
				{$t("sections.sketch")}
			</Navigation.Item>
			<Navigation.Item href={$pathBookmarks} pattern={/\/bookmarks/}>
				{$t("sections.bookmarks")}
			</Navigation.Item>
			<Navigation.Item href={$pathAbout} pattern={/\/about/}>
				{$t("sections.about")}
			</Navigation.Item>
		</Navigation.Container>
	</section>
	<section data-label="controls">
		<LocaleRoute />
		<ThemeSelect />
	</section>
</header>
