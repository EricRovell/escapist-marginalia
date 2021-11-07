<script lang="ts">
	import { page } from "$app/stores";
	import { lang } from "@core/i18n";
	import { Icon } from "@components";
	import { iconLocale } from "@components/icons/default";

	export let title: string | undefined = undefined;

	/**
	 * Improves UX by staying on the same page while changing the language.
	 * The function cuts off /:lang parameter if present to construct from it
	 * links to translated pages.
	 * 
	 * If the parameter is not present, redirect to the root.
	 */
	function stripLangParam(href: string): string {
		const regex = /^\/(ru|en)\//;
		return (regex.test(href) && href) 
			? href.replace(regex, "")
			: "home";
	}

	let href: string;
	let path: string;

	$: path = $page.path;
	$: href = stripLangParam(path);
</script>

<div class="lang-select" {title}>
	<Icon path={iconLocale} color="primary" />
	{#each [ "en", "ru" ] as language}
		<a
			href={`/${language}/${href}`}
			class:active={$lang === language}
			>
				{language}
		</a>
	{/each}
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

	.lang-select > a {
		text-transform: uppercase;
	}

	.active {
		color: var(--color-primary);
	}
</style>