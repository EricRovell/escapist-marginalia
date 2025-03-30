type Lang = "en" | "ru";

export const SITE_NAME = "Escapist Marginalia";
export const LANG: Lang = import.meta.env.LANG?.slice(0, 2) ?? "en";
