<script lang="ts">
	import Datetime from "../../Datetime.svelte";
	import { _, lang } from "@core/i18n";
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

<header class={styles.header}>
	<h1>{title}</h1>
	<p>{description}</p>
	<footer>
		<ul>
			{#each keywords.split(",") as keyword}
				<li>{keyword}</li>
			{/each}
		</ul>
		<span>{$_(`message.${dateMessage}`)}: <Datetime {date} locale={$lang} options={dateOptions} relative /></span>
	</footer>
</header>