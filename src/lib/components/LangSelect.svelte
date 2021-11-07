<script lang="ts">
	import { lang } from "@core/i18n";
	import { Icon } from "@components";
	import { iconLocale } from "@components/icons/default";

	export let title: string | undefined = undefined;
	// ^\/(ru|en)\/
</script>

<div class="lang-select" {title}>
	<Icon path={iconLocale} color="primary" />
	<a href="/ru/home" class:active={$lang === "ru"}>RU</a>
	<a href="/en/home" class:active={$lang === "en"}>EN</a>
</div>

<style>
  .lang-select {
    display: flex;
    justify-content: center;
    align-items: center;
		gap: var(--space-xs);
   
    font-size: var(--font-size-1);
    padding: var(--space-s);
    border-radius: var(--radius-medium);
		border: var(--border-1);
		padding: 0.5em;
  }

	.active {
		color: var(--color-primary);
	}
</style>