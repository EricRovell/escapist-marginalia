export const ROUTES = {
	ABOUT: "/about",
	BOOKMARKS: "/bookmarks",
	GALLERY: "/gallery",
	HOME: "/",
	LICENSE: "/license",
	PRIVACY: "/privacy",
	PROJECTS: "/projects",
	PROJECTS_ITEM: (slug: string) => `/projects/${decodeURI(slug)}`,
	SKETCHES: "/sketches",
	SKETCHES_ITEM: (slug: string) => `/sketches/${decodeURI(slug)}`,
	WRITING: "/writing",
	WRITING_ITEM: (slug: string) => `/writing/${decodeURI(slug)}`
};

export const ROUTES_SOCIALS = {
	GITHUB: "https://github.com/EricRovell",
	GITLAB: "https://gitlab.com/ericrovell",
	INSTAGRAM: "https://www.instagram.com/Eric_Rovell",
	LEETCODE: "https://leetcode.com/Eric_Rovell/",
	RSS: "/rss.xml",
	TELEGRAM: "https://t.me/escapist_marginalia"
};
