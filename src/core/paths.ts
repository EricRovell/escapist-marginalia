import { derived } from "svelte/store";
import { locale } from "./i18n";
import { page } from "$app/stores";

// base
export const webpageRoot = derived(page, $page => `https://${$page.url.host}`);
export const webpage = derived(page, $page => `https://${$page.url.host}${$page.url.pathname}`);
export const root = derived(locale, $locale => `/${$locale}`);

// pages
export const pathAbout = derived(root, $root => `${$root}/about`);
export const pathBookmarks = derived(root, $root => `${$root}/bookmarks`);
export const pathGallery = derived(root, $root => `${$root}/gallery`);
export const pathHome = derived(root, $root => `${$root}/home`);
export const pathLicense = derived(root, $root => `${$root}/license`);
export const pathPrivacy = "";
export const pathProjects = derived(root, $root => `${$root}/projects`);
export const pathSketch = derived(root, $root => `${$root}/sketch`);
export const pathWriting = derived(root, $root => `${$root}/writing`);

// page::item
export const pathBlogpost = derived(pathWriting, $root => (slug: string) => `${$root}/${encodeURI(slug)}`);
export const pathGalleryImage = derived(pathGallery, $root => (id: string) => `${$root}/${id}`);
//export const pathProject = derived(pathProjects, $root => (slug: string) => `${$root}/${encodeURI(slug)}`);

// socials
export const pathInstagram = "https://www.instagram.com/Eric_Rovell";
export const pathLeetcode = "https://leetcode.com/Eric_Rovell/";
export const pathRSS = derived(root, $root => `${$root}/rss.xml`);
export const pathRSSMultilang = derived(webpage, $webpage => `${$webpage}/rss.xml`);
export const pathTelegram = derived(locale, $locale => `https://t.me/escapist_marginalia${$locale === "ru" ? "_ru" : ""}`);

export { homepage as pathSource } from "../../package.json";
