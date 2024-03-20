<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { InputRadio } from "ui";

	import { locale } from "@core/i18n";

	const handleChange = async (event: InputEvent) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;
		const currentLocale = $page.url.pathname.slice(0, 4);
		const href = $page.url.pathname.replace(currentLocale, `/${value}/`);

		await goto(href);
	};
</script>

<InputRadio.Group name="language" on:change={handleChange}>
	<h4 slot="title">
		Interface language
	</h4>
	<InputRadio.Button value="en" checked="{$locale === "en"}">
		English
	</InputRadio.Button>
	<InputRadio.Button value="ru" checked="{$locale === "ru"}">
		Русский
	</InputRadio.Button>
</InputRadio.Group>
