<script>
	import { pathHome, pathBlog, pathGallery, pathProjects, pathAbout } from "@paths";
	import { t } from "@core/i18n";
	import * as Navigation from "../menu";
	import styles from "./side-menu.module.css";

	export let show = false;
</script>

<section class={styles["menu-body"]} label="menu" class:show>
	<Navigation.Container>
		<Navigation.Item href={$pathHome} pattern={/\/home/}>
			{$t("sections.home")}
		</Navigation.Item>
		<Navigation.Item href={$pathBlog} pattern={/\/blog|\/content/}>
			{$t("sections.blog")}
		</Navigation.Item>
		<Navigation.Item href={$pathGallery} pattern={/\/gallery/}>
			{$t("sections.gallery")}
		</Navigation.Item>
		<Navigation.Item href={$pathProjects}>
			{$t("sections.projects")}
		</Navigation.Item>
		<Navigation.Item href={$pathAbout} disabled>
			{$t("sections.about")}
		</Navigation.Item>
	</Navigation.Container>
</section>