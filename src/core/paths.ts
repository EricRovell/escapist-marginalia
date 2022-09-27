import { derived } from "svelte/store";
import { locale } from "./i18n";
import { page } from "$app/stores";

export const webpageRoot = derived(page, $page => `https://${$page.url.host}`);
export const webpage = derived(page, $page => `https://${$page.url.host}${$page.url.pathname}`);
export const root = derived(locale, $locale => `/${$locale}`);

export const pathHome = derived(root, $root => `${$root}/home`);
export const pathBlog = derived(root, $root => `${$root}/blog`);
export const pathGallery = derived(root, $root => `${$root}/gallery`);
export const pathProjects = derived(root, $root => `${$root}/projects`);
export const pathAbout = derived(root, $root => `${$root}/about`);
export const pathRSS = derived(root, $root => `${$root}/rss.xml`);
export const pathRSSMultilang = derived(webpage, $webpage => `${$webpage}/rss.xml`);

export const pathBlogpost = derived(pathBlog, $root => (slug: string) => `${$root}/${encodeURI(slug)}`);
export const pathGalleryImage = derived(pathGallery, $root => (id: string) => `${$root}/${id}`);
export const pathProject = derived(pathProjects, $root => (slug: string) => `${$root}/${encodeURI(slug)}`);

export const pathLicence = "https://github.com/EricRovell/ericrovell.me/blob/main/LICENSE";
export { homepage as pathSource } from "../../package.json";
export const pathPrivacy = "";
