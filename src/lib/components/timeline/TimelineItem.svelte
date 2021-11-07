<script lang="ts">
	import Datetime from "../Datetime.svelte";
	import styles from "./timeline.module.css";

	export let date: Date;
	export let locale: string | undefined = undefined;
	export let action = "New blogpost";

	const dateOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};
</script>

<li class={styles.item}>
	<div class={styles.marker} />
	<article>
		<Datetime {date} options={dateOptions} {locale} />
		<h2>{action}</h2>
		<slot />
	</article>
</li>