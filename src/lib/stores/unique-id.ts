/**
 * Stores all unique ID used for DOM elements.
 */
export const idStore = new Set<string>();

/**
 * Provides interface for managing unique IDs.
 */
const idStoreConstructor = () => {
	const get = () => {
		let success = false;
		let id: string;

		while (!success) {
			id = Math.random().toString(36).substring(2, 9);
			if (!idStore.has(id)) {
				idStore.add(id);
				success = true;
			}
		}

		return id;
	};

	const remove = (id: string) => {
		if (idStore.has(id)) {
			idStore.delete(id);
			return true;
		}

		return false;
	};

	return {
		get,
		remove
	};
};

export const uniqueID = idStoreConstructor(); 
