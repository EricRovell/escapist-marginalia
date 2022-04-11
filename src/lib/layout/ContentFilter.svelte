<script lang="ts">
	import { t } from "@core/i18n";
	import { SwitchGroup } from "@components";

	export let contentLanguage: string[] = [];
</script>

<!--
	Layout for page with main content and filters tab.
-->
<div>
	<slot />
</div>
<aside>
	<SwitchGroup
		legend={$t("message.content-language")}
		name="content-lang"
		options={[
			{ label: "English", value: "en" },
			{ label: "Русский", value: "ru" }
		]}
		bind:group={contentLanguage}
	/>
</aside>