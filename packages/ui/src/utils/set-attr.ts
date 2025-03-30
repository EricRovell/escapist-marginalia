/**
 * Sets the boolean attribute depending on state.
 */
export function setAttr(state = false, value = "") {
	return state ? value : undefined;
}
