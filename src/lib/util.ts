/**
 * Fetches a JSON from specific URL.
 */
export async function fetchJSON<T>(url: string, options: RequestInit = {}): Promise<T> {
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`An error has occured: ${response.status}`);
		}

		const json: T = await response.json();
		return json;
	} catch(error) {
		console.error(error.message);
	}
}