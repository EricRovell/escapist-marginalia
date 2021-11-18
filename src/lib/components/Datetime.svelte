<script lang="ts" context="module">
  function renderDate(date: Date | string = new Date(), locale?: string, params?: Intl.DateTimeFormatOptions) {
  	const renderDate = new Intl.DateTimeFormat(locale, params ?? {
  		year: "numeric",
  		month: "short",
  		day: "numeric",
  		hour: "numeric",
  		minute: "numeric",
  		hour12: false
  	});

  	return renderDate.format(new Date(date));
  }

  function renderRelativeDate(date: Date | string = new Date(), locale?: string) {
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

  	return renderDate(date, locale);
  }
</script>

<script lang="ts">
	export let date: Date | string = new Date();
	export let options: Intl.DateTimeFormatOptions | undefined = undefined;
	export let locale: string | undefined = undefined;
	export let relative = false;

	let renderedDate = (relative)
		? renderRelativeDate(date, locale)
		: renderDate(date, locale, options);
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