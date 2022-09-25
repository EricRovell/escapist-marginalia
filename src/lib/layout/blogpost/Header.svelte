<script lang="ts">
	import { t, locale } from "@core/i18n";
	import { pathBlogpost, webpage } from "@core/paths";
	import { Button, Datetime, Icon, Link } from "@components";
	import { iconShare } from "@components/icons/default";
	import { encodeTitleId, share } from "@utils/helpers";
	import styles from "./header.module.css";

	export let title: string;
	export let description: string;
	export let keywords = "";
	export let created: string;
	export let updated: string;
	export let translation = null;

	const dateOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric"
	};

	const handleShare = async () => {
		await share({
			text: description,
			title,
			url: $webpage
		});
	};
</script>

<div class={styles.wrapper}>
	<Button
		appearance="ghost"
		className="{styles.share}"
		icon
		on:click={handleShare}
	>
		<Icon path="{iconShare}" title="{$t("tooltip.share")}" />
	</Button>
	<h1 id="{encodeTitleId(title)}">
		{title}
	</h1>
	<p>{description}</p>
	<footer>
		<ul class="{styles.keywords}">
			{#each keywords as keyword}
				<li class="surface-4">
					{keyword}
				</li>
			{/each}
		</ul>
		<span class="{styles.date}">
			{$t("message.published")} <Datetime date={created} locale={$locale} options={dateOptions} relative />
			{#if updated}
				, {$t("message.updated")} <Datetime date={updated} locale={$locale} options={dateOptions} relative />
			{/if}
		</span>
		{#if translation}
			<span class="{styles.translations}">
				{$t("message.available-translation")} <Link href="{$pathBlogpost(translation.slug)}">{translation.lang}</Link>
			</span>
		{/if}
	</footer>
</div>
