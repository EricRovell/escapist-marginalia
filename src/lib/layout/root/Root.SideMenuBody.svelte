<script>
	import { pathHome, pathWriting, pathGallery, pathProjects, pathSketch, pathBookmarks, pathAbout } from "@paths";
	import { t } from "@core/i18n";
	import { Menu as Navigation, NavLocale, ThemeSelect } from "@components";
	import styles from "./root-side-menu-body.module.css";
</script>

<section label="nav" class="{styles.nav}">
	<Navigation.Container>
		<Navigation.Item href={$pathHome} pattern={/\/home/}>
			{$t("sections.home")}
		</Navigation.Item>
		<Navigation.Item href={$pathWriting} pattern={/\/writing|\/content/}>
			{$t("sections.writing")}
		</Navigation.Item>
		<Navigation.Item href={$pathGallery} pattern={/\/gallery/}>
			{$t("sections.gallery")}
		</Navigation.Item>
		<Navigation.Item href={$pathProjects}>
			{$t("sections.projects")}
		</Navigation.Item>
		<Navigation.Item href={$pathSketch}>
			{$t("sections.sketch")}
		</Navigation.Item>
		<Navigation.Item href={$pathBookmarks}>
			{$t("sections.bookmarks")}
		</Navigation.Item>
		<Navigation.Item href={$pathAbout} disabled>
			{$t("sections.about")}
		</Navigation.Item>
	</Navigation.Container>
</section>
<section label="controls" class="{styles.controls}">
	<div>
		<span>{$t("dict.theme")}:</span>
		<ThemeSelect labeled />
	</div>
	<div>
		<span>{$t("dict.language")}:</span>
		<NavLocale />
	</div>
</section>
