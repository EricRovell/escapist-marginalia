import { writable, get } from "svelte/store";
import { mediaObserver } from "svelte-media-observer";
import type { MediaQueries } from "svelte-media-observer";

export type Theme = "light" | "dark" | "auto";

const mediaQueries: MediaQueries<"light"> = [
	[ "light", "(prefers-color-scheme: light)" ]
];

export const media = mediaObserver(mediaQueries);

//const forced = writable<boolean>(false);

/**
 * Theme store has two states: forced | system.
 */
function initThemeStore() {
	const initial: Theme = get(media).light ? "light" : "dark";
	

	const { subscribe, update } = writable<Theme>(initial);

	return {
		subscribe,
		change: () => update(value => value === "dark" ? "light" : "dark")
	};
}

export const theme = initThemeStore();