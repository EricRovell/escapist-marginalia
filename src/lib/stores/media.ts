import {
	mediaObserver as createObserver,
	type MediaQueries
} from "svelte-media-observer";

type Query = "mobile";

const queries: MediaQueries<Query> = [
	[ "mobile", "(max-width: 48em) "]
];

export const media = createObserver(queries);
