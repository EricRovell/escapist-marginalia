/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="mdsvex/globals" />

declare module "*.module.css";

declare module "$locales/*.json" {
	interface DeepDictionary {
		[key: string]: DeepDictionary | string | string[];
	}

	const value: DeepDictionary;
	export default value;
}

declare namespace App {
	interface Session {
		userLanguage: string;
	}
}