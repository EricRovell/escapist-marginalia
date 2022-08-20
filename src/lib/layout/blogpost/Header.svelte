<script lang="ts">
	import { t, locale } from "@core/i18n";
	import { Datetime } from "@components";
	import { encodeTitleId } from "@utils/helpers";
	import styles from "./header.module.css";

	export let title: string;
	export let description: string;
	export let keywords = "";
	export let created: string;
	export let updated: string;

	const dateOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric"
	};

	const [ date, dateMessage ] = (created !== updated)
		? [ updated, "last-updated-at"]
		: [ created, "created-at" ];
</script>

<div class={styles.wrapper}>
	<h1 id="{encodeTitleId(title)}">
		{title}
	</h1>
	<p>{description}</p>
	<footer>
		<ul>
			{#each keywords as keyword}
				<li>{keyword}</li>
			{/each}
		</ul>
		<span>{$t(`message.${dateMessage}`)}: <Datetime {date} locale={$locale} options={dateOptions} relative /></span>
	</footer>
</div>