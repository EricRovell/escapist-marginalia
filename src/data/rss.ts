import head from "$locales/rss.json";
import { getBlogposts } from "@data/posts";
import type { Blogpost } from "@types";

type RenderHead = (origin: string, locale?: string, buildDate?: Date) => string;
type BuildRSS = ({ origin, locale }: { origin: string, locale?: "en" | "ru" }) => Promise<string>;

const renderHead: RenderHead = (origin, locale = "en", buildDate = new Date()) => {
	return `
		<title>${head[locale]["title"]}</title>
		<link>${origin}</link>
		<description>${head[locale]["description"]}</description>
		<language>${locale}</language>
		<pubDate>${buildDate}</pubDate>
		<lastBuildDate>${buildDate}</lastBuildDate>
	`;
};

const renderItem = ({ title, slug, description, created, lang }: Blogpost, origin: string) => {
	const itemURL = `${origin}/${lang}/writing/${slug}`;

	return `
		<item>
			<title>${title}</title>
			<link>${itemURL}</link>
			<description>${description}</description>
			<pubDate>${created}</pubDate>
			<guid>${itemURL}</guid>
			<category>article</category>
		</item>
	`;
};

export const buildRSSFeed: BuildRSS = async ({ origin, locale }) => {
	const items: Blogpost[] = await getBlogposts({
		published: true,
		lang: locale
	});

	return `
			<rss version="2.0">
				${renderHead(origin, locale)}
				<channel>
					${items.map(item => renderItem(item, origin)).join("")}
				</channel>
			</rss>
	`;
};
