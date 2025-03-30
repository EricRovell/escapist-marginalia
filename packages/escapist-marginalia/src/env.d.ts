// <reference path="../.astro/types.d.ts" />
import "../.astro/types.d.ts";

type LANG = "en" | "ru";

interface ImportMetaEnv {
	readonly PUBLIC_LANG: LANG;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
