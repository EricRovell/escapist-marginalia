<script lang="ts" context="module">
	interface Props {
		date?: Date | string;
		options?: Intl.DateTimeFormatOptions;
		locale?: string;
		relative?: boolean;
	}
</script>

<script lang="ts">
	import { defaultOptions, renderDate, renderRelativeDate } from "./datetime.helpers";
	import styles from "./datetime.module.css";

	type $$Props = Props;

	export let date: $$Props["date"] = new Date();
	export let locale = "en";
	export let options: $$Props["options"] = defaultOptions;
	export let relative: $$Props["relative"] = false;

	$: renderedDate = (relative)
		? renderRelativeDate(date, locale, options)
		: renderDate(date, locale, options);
</script>

<time
	class="{styles.datetime}"
	datetime="{renderedDate}"
>
	{renderedDate}
</time>
