<script lang="ts" context="module">
	interface Props {
		date?: Date | string;
		options?: Intl.DateTimeFormatOptions;
		locale?: string;
		relative?: boolean;
	}

	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: false
	};

	function renderDate(date: Date | string = new Date(), locale?: string, params: Intl.DateTimeFormatOptions = defaultOptions) {
		const renderDate = new Intl.DateTimeFormat(locale, params);
		return renderDate.format(new Date(date));
	}

	function renderRelativeDate(date: Date | string = new Date(), locale?: string, params: Intl.DateTimeFormatOptions = defaultOptions) {
		const difference = Date.now() - new Date(date).getTime();
		const rtf = new Intl.RelativeTimeFormat(locale);

		for (let hour = 1; hour < 23; hour++) {
			if (difference < hour * 3600 * 1000) {
				return rtf.format(-1 * hour, "hour");
			}
		}

		for (let day = 1; day < 4; day++) {
			if (difference < day * 24 * 3600 * 1000) {
				return rtf.format(-1 * day, "day");
			}
		}

		if (difference < 7 * 24 * 3600 * 1000) {
			return rtf.format(-1, "week");
		}

		return renderDate(date, locale, params);
	}
</script>

<script lang="ts">
	import { locale } from "@core/i18n";

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
<time datetime={renderedDate}>
  {renderedDate}
</time>

<style>
  time {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;

    font-size: var(--datetime-font-size, inherit);
    color: var(--datetime-color, inherit);
    user-select: none;
  }
</style>