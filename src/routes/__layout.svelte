<script context="module" lang="ts">
	import { init, loadMessages, validateLocale, supportedLocales } from "@core/i18n";
	import type { Load } from "@sveltejs/kit";

	export const load: Load = ({ session, params, url }) => {
		loadMessages();

		const locale = validateLocale(params.locale || session.userLanguage);

		init({
			initialLocale: locale,
			fallbackLocale: "ru"
		});

		if (url.pathname === "/") {
			return {
				status: 303,
				redirect: `/${locale}/home`
			};
		}

		if (!supportedLocales.includes(params.locale)) {
			return {
				status: 303,
				redirect: `/${locale}/home`
			};
		}

		return {
			status: 200
		};
	};
</script>

<script lang="ts">
	import { LayoutRoot } from "@lib/layout";
</script>

<LayoutRoot>
	<slot />
</LayoutRoot>