import type { Locale } from "types";

import { buildRSSFeed } from "@data/rss";

export const prerender = true;

export const GET = async ({ params, url }) => {
	const rssFeed = await buildRSSFeed({
		origin: url.origin,
		locale: params.locale as Locale
	});

	return new Response(rssFeed.trim(), {
		headers: {
			"Cache-Control": "max-age=0, s-maxage=3600",
			"Content-Type": "application/xml"
		}
	});
};
