<script lang="ts">
	import { t, locale } from "@core/i18n";
	import { pathBlogpost, webpage } from "@core/paths";
	import { Button, Datetime, Icon, Link } from "@components";
	import { iconShare } from "@icons";
	import { encodeTitleId, share } from "@utils/helpers";
	import styles from "./header.module.css";

	export let dateCreated: string;
	export let dateUpdated: string;
	export let title: string;
	export let description: string;
	export let keywords = "";
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
			<span>
				{$t("message.published")} <Datetime date={dateCreated} locale={$locale} options={dateOptions} relative />
			</span>
			{#if dateUpdated}
				<span>
					{$t("message.updated")} <Datetime date={dateUpdated} locale={$locale} options={dateOptions} relative />
				</span>
			{/if}
		</span>
		{#if translation}
			<span class="{styles.translations}">
				{$t("message.available-translation")} <Link href="{$pathBlogpost(translation.slug)}">{translation.lang}</Link>
			</span>
		{/if}
	</footer>
</div>
