/**
 * Shares a data using `Web Share API` if supported.
 */
export async function share(data: ShareData): Promise<boolean> {
	if (!navigator.share || !navigator.canShare) {
		return false;
	}

	if (!navigator.canShare(data)) {
		console.error("Specified data cannot be shared.");
		return false;
	}

	try {
		await navigator.share(data);
		return true;
	} catch (error) {
		console.error(`Sharing was unsuccessful: ${error.message}`);
		return false;
	}
}
