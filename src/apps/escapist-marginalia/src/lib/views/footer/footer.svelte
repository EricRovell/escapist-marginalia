<script lang="ts">
	import { Datetime, Icon, Link } from "ui";
	import { iconGithub, iconLeetcode, iconInstagram, iconRSS, iconTelegram } from "ui/icons";

	import NavLocale from "./footer.locale.svelte";
	import { locale, t } from "@core/i18n";
	import styles from "./footer.module.css";

	import {
		pathAbout,
		pathBookmarks,
		pathGallery,
		pathInstagram,
		pathLeetcode,
		pathLicense,
		pathPrivacy,
		pathRSS,
		pathSketch,
		pathSource,
		pathTelegram,
		pathWriting
	} from "@core/paths";

	$: links = [
		{ label: "writing", href: $pathWriting },
		{ label: "gallery", href: $pathGallery },
		{ label: "sketch", href: $pathSketch },
		{ label: "bookmarks", href: $pathBookmarks },
		{ label: "license", href: $pathLicense },
		{ label: "privacy", href: pathPrivacy, disabled: true },
		{ label: "about", href: $pathAbout }
	];

	$: icons = [
		{ label: "source", href: pathSource, icon: iconGithub },
		{ label: "rss", href: $pathRSS, icon: iconRSS },
		{ label: "telegram", href: $pathTelegram, icon: iconTelegram },
		{ label: "instagram", href: pathInstagram, icon: iconInstagram },
		{ label: "leetcode", href: pathLeetcode, icon: iconLeetcode }
	];
</script>

<footer class="surface-2 {styles.footer}">
	<div class="container {styles.wrapper}">
		<nav class={styles.navigation}>
			<ul>
				{#each links as { label, href, disabled = false }}
					<li>
						<Link {href} {disabled}>
							{$t(`sections.${label}`)}
						</Link>
					</li>
				{/each}
			</ul>
		</nav>
		<nav class={styles.socials}>
			<ul>
				{#each icons as { label, href, icon }}
					<li>
						<Link block {href}>
							<Icon path={icon} title={$t(`sections.${label}`)} />
						</Link>
					</li>
				{/each}
			</ul>
		</nav>
		<section class={styles.user}>
			<p>
				<span>
					© <Datetime locale="{$locale}" options={{ year: "numeric" }} />, Eric/Rovell
				</span>
				<span>{$t("message.build-at")} <Datetime locale="{$locale}" date={"BUILD_TIME"} /></span>
			</p>
			<div class={styles.locale}>
				<span>{$t("dict.language")}:</span>
				<NavLocale />
			</div>
		</section>
	</div>
</footer>
