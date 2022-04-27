<script lang="ts">
	import { page } from "$app/stores";
	import { locale, t } from "@core/i18n";
	import Link from "../Link.svelte";
	import styles from "./nav-locale.module.css";

	const regex = /^\/(ru|en)\//;

	$: pathname = $page.url.pathname;
	$: route = $locale === "ru"	? "en" : "ru";
	$: href = (regex.test(pathname))
		? pathname.replace(regex, "")
		: "home";
</script>

<nav class={styles["locale-route"]}>
	<Link
		active={$locale === route}
		href={`/${route}/${href}`}
		title={$t("tooltip.change-locale")}
	>
		{route}
	</Link>
</nav>
