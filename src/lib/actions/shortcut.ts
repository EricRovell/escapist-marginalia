import type { Action } from "./types";

export interface ShortcutOptions {
	active?: boolean;
	alt?: boolean;
	callback?: (node : HTMLElement) => void;
	/**
	 * The code of the key to listen for.
	 * 
	 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
	 */
	code: KeyboardEventInit["code"];
	control?: boolean;
	shift?: boolean;
}

const callbackDefault = (node: HTMLElement) => node.click();

/**
 * Adds a keyboard shortcut listener to an element.
 * If callback is not provided, clicks on the node it was put on.
 */
export const shortcut: Action<ShortcutOptions> = (node, options) => {

	const validate = (event: KeyboardEvent) => {
		const {
			alt = false,
			code,
			control = false,
			shift = false
		} = options;

		return [
			code === event.code,
			alt === event.altKey,
			control == event.ctrlKey || control === event.metaKey,
			shift === event.shiftKey
		].every(Boolean);
	};

	const handleKeyboard = (event: KeyboardEvent) => {
		if (!validate(event)) {
			return;
		}

		event.preventDefault();
		(options.callback || callbackDefault)(node);
	};
	
	const activate = () => {
		window.addEventListener("keydown", handleKeyboard);
	};

	const deactivate = () => {
		window.removeEventListener("keydown", handleKeyboard);
	};

	const init = () => {
		const { active = true } = options;
		active
			? activate()
			: deactivate();
	};

	init();

	return {
		update(updatedOptions) {
			options = updatedOptions;
			init();
		},
		destroy() {
			deactivate();
		}
	};
};
