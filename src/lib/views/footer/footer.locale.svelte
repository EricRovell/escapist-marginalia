<script lang="ts">
	import { page } from "$app/stores";
	import { locale, t } from "@core/i18n";
	import { Link } from "@components";
	import styles from "./footer.module.css";

	const regex = /^\/(ru|en)\//;

	$: pathname = $page.url.pathname;
	$: href = (regex.test(pathname))
		? pathname.replace(regex, "")
		: "home";
</script>

<nav
	class="{styles["nav-locale"]}"
	title="{$t("tooltip.change-locale")}"
>
	<Link
		aria-current="{$locale === "en" ? true : undefined}"
		href="{`/en/${href}`}"
	>
		<span>EN</span>
	</Link>
	<Link
		aria-current="{$locale === "ru" ? true : undefined}"
		href="{`/ru/${href}`}"
	>
		<span>RU</span>
	</Link>
</nav>
