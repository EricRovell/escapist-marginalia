<script lang="ts">
	import { InputSwitchGroup } from "ui";
	import { iconPi, iconImg, iconGlobe } from "ui/icons";

	import { locale, t } from "@core/i18n";
	import styles from "./filter-writing.module.css";

	export let value = {
		"content-lang": [ $locale ],
		"content-topics": []
	};
</script>

<form class="{styles.filters}" on:submit|preventDefault on:change>
	<InputSwitchGroup
		legend={$t("dict.language")}
		name="content-lang"
		options={[
			{ label: "English", value: "en", checked: $locale === "en" },
			{ label: "Русский", value: "ru", checked: $locale === "ru" }
		]}
		bind:group={value["content-lang"]}
	/>
	<InputSwitchGroup
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
