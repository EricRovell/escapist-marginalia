import { buildRSSFeed } from "@data/rss";

export async function GET({ params, url }) {
	const headers = {
		"Cache-Control": "max-age=0, s-maxage=3600",
		"Content-Type": "application/xml"
	};

	const rssFeed = await buildRSSFeed({
		origin: url.origin,
		locale: params.locale
	});

	return {
		headers,
		body: rssFeed
	};
}