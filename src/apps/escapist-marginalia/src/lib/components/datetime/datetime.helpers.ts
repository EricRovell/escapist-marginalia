export const defaultOptions: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	hour12: false
};

export const renderDate = (date: Date | string = new Date(), locale?: string, params: Intl.DateTimeFormatOptions = defaultOptions) => {
	const renderDate = new Intl.DateTimeFormat(locale, params);
	return renderDate.format(new Date(date));
};

export const renderRelativeDate = (date: Date | string = new Date(), locale?: string, params: Intl.DateTimeFormatOptions = defaultOptions) => {
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
};
