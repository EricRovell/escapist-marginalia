<script>
	import { pathHome, pathBlog, pathGallery, pathProjects, pathAbout } from "@paths";
	import { t } from "@core/i18n";
	import { Menu } from "@components";
</script>

<Menu.Container>
	<Menu.Item href={$pathHome} pattern={/\/home/}>
		{$t("sections.home")}
	</Menu.Item>
	<Menu.Item href={$pathBlog} pattern={/\/blog|\/content/}>
		{$t("sections.blog")}
	</Menu.Item>
	<Menu.Item href={$pathGallery} pattern={/\/gallery/}>
		{$t("sections.gallery")}
	</Menu.Item>
	<Menu.Item href={$pathProjects}>
		{$t("sections.projects")}
	</Menu.Item>
	<Menu.Item href={$pathAbout} disabled>
		{$t("sections.about")}
	</Menu.Item>
</Menu.Container>
