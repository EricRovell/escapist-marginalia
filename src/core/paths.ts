import { base } from "$app/paths";

export const pathRoot = `${base}/`;

export const pathBlog = `${base}/blog`;
export const pathGallery = `${base}/gallery`;
export const pathProjects = `${base}/projects`;
export const pathAbout = `${base}/about`;

export const pathBlogpost = (slug: string) => `${base}/content/${slug}`;