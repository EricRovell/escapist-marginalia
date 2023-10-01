<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { locale } from "@core/i18n";
	import * as Radio from "../../components/radio";

	const handleChange = async (event: InputEvent) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;
		const currentLocale = $page.url.pathname.slice(0, 4);
		const href = $page.url.pathname.replace(currentLocale, `/${value}/`);

		await goto(href);
	};
</script>

<Radio.Group name="language" on:change={handleChange}>
	<h4 slot="title">
		Interface language
	</h4>
	<Radio.Button value="en" checked="{$locale === "en"}">
		English
	</Radio.Button>
	<Radio.Button value="ru" checked="{$locale === "ru"}">
		Русский
	</Radio.Button>
</Radio.Group>
