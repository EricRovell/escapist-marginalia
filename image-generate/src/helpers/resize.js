export const resize = (size, vertical) => {
	return vertical
		? { height: size }
		: { width: size };
};
