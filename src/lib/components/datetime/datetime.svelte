<script lang="ts" context="module">
	interface Props {
		date?: Date | string;
		options?: Intl.DateTimeFormatOptions;
		locale?: string;
		relative?: boolean;
	}
</script>

<script lang="ts">
	import { locale } from "@core/i18n";
	import { defaultOptions, renderDate, renderRelativeDate } from "./datetime.helpers";
	import styles from "./datetime.module.css";

	type $$Props = Props;

	export let date: $$Props["date"] = new Date();
	export let options: $$Props["options"] = defaultOptions;
	export let relative: $$Props["relative"] = false;

	$: renderedDate = (relative)
		? renderRelativeDate(date, $locale, options)
		: renderDate(date, $locale, options);
</script>

<!--
	@component
	DateTime component.
	Renders the date in readable format.
	
	Props:
		| Props name | type                   | default      | description                     |
		|------------|------------------------|--------------|---------------------------------|
		| date       | Date or string         | current date | date string or object to render |
		| options    | Intl.DateFormatOptions | undefined    | date options                    |
		| relative   | boolean                | false        | showing relative date           |  
-->
<time
	class="{styles.datetime}"
	datetime="{renderedDate}"
>
	{renderedDate}
</time>
