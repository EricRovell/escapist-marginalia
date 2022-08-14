<script lang="ts">
	import { pathHome, pathBlog, pathGallery, pathProjects, pathAbout } from "@paths";
	import { t } from "@core/i18n";

	import * as Navigation from "../menu";
	import Icon from "../icons/Icon.svelte";
	import { ThemeSelect } from "../theme-select";
	import LocaleRoute from "../nav-locale/NavLocale.svelte";
	import Link from "../Link.svelte";
	import { logo } from "@components/icons/logo";

	import styles from "./masthead.module.css";
</script>

<header class={`container ${styles.masthead}`}>
	<section label="logo">
		<Link href={$pathHome}>
			<Icon path={logo} />
		</Link>
	</section>
	<section label="navigation">
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
	<section label="controls">
		<LocaleRoute />  
		<ThemeSelect />
	</section>
</header>