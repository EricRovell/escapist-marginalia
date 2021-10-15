import { writable } from "svelte/store";
import { mediaObserver } from "svelte-media-observer";
import type { MediaQueries } from "svelte-media-observer";

export type Theme = "light" | "dark" | "auto";

const mediaQueries: MediaQueries<"light"> = [
	[ "light", "(prefers-color-scheme: light)" ]
];

export const media = mediaObserver(mediaQueries);

function getThemePreference(): Theme {
	if (globalThis.window) {
		const theme = document.documentElement.getAttribute("theme");
		if (theme === "dark" || theme === "light") {
			return theme;
		}
	}

	return "auto";
}

function initThemeStore() {
	const initial: Theme = getThemePreference();
	const { subscribe, update } = writable<Theme>(initial);

	return {
		subscribe,
		change: () => update(value => {
			if (value === "light") return "dark";
			if (value === "dark") return "auto";
			return "light";
		})
	};
}

export const theme = initThemeStore();

theme.subscribe(value => {
	if (!globalThis.window) {
		return;
	}

	if (value !== "auto") {
		document.documentElement.setAttribute("theme", value);
	} else {
		document.documentElement.removeAttribute("theme");
	}
});