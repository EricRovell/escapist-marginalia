export interface MetaProps {
	title?: string;
	alternate?: Alternate;
	meta?: MetaTags;
	twitter?: Twitter;
	openGraph?: OpenGraph;
}

type MetaKeys =
	| "title"
	| "description"
	| "keywords"
	| "subject"
	| "language"
	| "revised"
	| "abstract"
	| "topic"
	| "summary"
	| "author"
	| "url"
	| "robots";

type TwitterKeys =
	| "card"
	| "site"
	| "creator"
	| "url"
	| "title"
	| "description"
	| "image:src"
	| "image:alt"

type OpenGraphKeys = 
	| "author"
	| "tag"
	| "title"
	| "type"
	| "url"
	| "image"
	| "description"
	| "locale"
	| "section"
	| "site_name"
	| "article:published_time"
	| "article:modified_time"
	| "article:section"
	| "article:tag";

export type MetaTags = Partial<
	Record<MetaKeys, string>
>;

export type Twitter = Partial<
	Record<TwitterKeys, string>
>;

export type OpenGraph = Partial<
	Record<OpenGraphKeys, string>
>;

/**
 * I have only two languages, in case there will be more,
 * need to use an array instead.
 */
export interface Alternate {
	href: string;
	hrefLang: string;
}
