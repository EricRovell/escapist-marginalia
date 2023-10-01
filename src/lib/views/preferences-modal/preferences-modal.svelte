<script lang="ts">
	import { Dialog } from "../../components";
	import ThemeRadio from "./preferences-theme.svelte";
	import LanguageRadio from "./preferences-language.svelte";
	import styles from "./preferences-modal.module.css";

	export let open = false;
</script>

<Dialog
	bind:open
	className={styles.settings}
>
	<h3 slot="title">
		Preferences
	</h3>
	<form on:submit|preventDefault>
		<LanguageRadio />
		<ThemeRadio />
	</form>
</Dialog>
