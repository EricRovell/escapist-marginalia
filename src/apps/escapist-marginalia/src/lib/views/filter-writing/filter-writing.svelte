<script lang="ts">
	import { locale, t } from "@core/i18n";
	import { SwitchGroup } from "@components";
	import { iconPi, iconImg, iconGlobe } from "@icons";
	import styles from "./filter-writing.module.css";

	export let value = {
		"content-lang": [ $locale ],
		"content-topics": []
	};
</script>

<form class="{styles.filters}" on:submit|preventDefault on:change>
	<SwitchGroup
		legend={$t("dict.language")}
		name="content-lang"
		options={[
			{ label: "English", value: "en", checked: $locale === "en" },
			{ label: "Русский", value: "ru", checked: $locale === "ru" }
		]}
		bind:group={value["content-lang"]}
	/>
	<SwitchGroup
		legend={$t("dict.topics")}
		name="content-topics"
		options={[
			{ label: $t("dict.math"), value: "math", icon: iconPi },
			{ label: $t("dict.photo"), value: "photo", icon: iconImg },
			{ label: $t("dict.web"), value: "web", icon: iconGlobe }
		]}
		bind:group={value["content-topics"]}
	/>
</form>
