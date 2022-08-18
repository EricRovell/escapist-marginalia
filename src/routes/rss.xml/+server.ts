import { buildRSSFeed } from "@data/rss";

export const GET = async ({ url }) => {
	const rssFeed = await buildRSSFeed({
		origin: url.origin
	});

	return new Response(rssFeed.trim(), {
		headers: {
			"Cache-Control": "max-age=0, s-maxage=3600",
			"Content-Type": "application/xml"
		}
	});
};
