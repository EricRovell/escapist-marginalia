import { writable } from "svelte/store";
import { mediaObserver } from "svelte-media-observer";
import type { MediaQueries } from "svelte-media-observer";

export type ThemeType = "light" | "dark";
export type ThemeOptions = ThemeType | "system";

export type Theme = {
	type: "user";
	value: "light" | "dark"
} | {
	type: "system"
}

const mediaQueries: MediaQueries<"light"> = [
	[ "light", "(prefers-color-scheme: light)" ]
];

export const media = mediaObserver(mediaQueries);

function getThemePreference(): Theme {
	if (!globalThis.window) {
		return {
			type: "system"
		};
	}

	const storedTheme = localStorage.getItem("theme") as ThemeType;

	if (storedTheme) {
		return {
			type: "user",
			value: storedTheme
		};
	}

	const currentTheme = document.documentElement.getAttribute("theme") as ThemeType;

	if (currentTheme) {
		return {
			type: "user",
			value: storedTheme
		};
	}

	return {
		type: "system"
	};
}

function initThemeStore() {
	const initial: Theme = getThemePreference();
	const { subscribe, set } = writable<Theme>(initial);

	return {
		subscribe,
		set: (theme: ThemeOptions) => {
			if (theme === "system") {
				set({ type: "system" });
			} else {
				set({ type: "user", value: theme });
			}
		}
	};
}

export const theme = initThemeStore();

theme.subscribe(theme => {
	if (!globalThis.window) {
		return;
	}

	if (theme.type === "system") {
		localStorage.removeItem("theme");
		document.documentElement.removeAttribute("theme");
		return;
	}

	localStorage.setItem("theme", theme.value);
	document.documentElement.setAttribute("theme", theme.value);
});
