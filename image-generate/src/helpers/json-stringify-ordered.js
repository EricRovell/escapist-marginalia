export const jsonStringifyOrdered = (object, space = "\t") => {
	const keys = new Set();
	JSON.stringify(object, (key, value) => (keys.add(key), value));
	return JSON.stringify(object, Array.from(keys).sort(), space);
};
