/**
 *
 */
export function encodeTitleId(title: string) {
	const id = title
		.toLowerCase()
		.replace(/\s/g, "-");

	return encodeURI(id);
}
