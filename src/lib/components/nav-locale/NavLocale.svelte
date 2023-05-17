<script lang="ts">
	import { page } from "$app/stores";
	import { locale, t } from "@core/i18n";
	import { Link } from "../link";
	import styles from "./nav-locale.module.css";

	const regex = /^\/(ru|en)\//;

	$: pathname = $page.url.pathname;
	$: route = $locale === "ru" ? "en" : "ru";
	$: href = (regex.test(pathname))
		? pathname.replace(regex, "")
		: "home";
</script>

<nav
	class={styles.nav}
	title={$t("tooltip.change-locale")}
>
	<Link
		aria-current={$locale === "en" ? true : undefined}
		href={`/en/${href}`}
	>
		<span>EN</span>
	</Link>
	<Link
		aria-current={$locale === "ru" ? true : undefined}
		href={`/ru/${href}`}
	>
		<span>RU</span>
	</Link>
</nav>
