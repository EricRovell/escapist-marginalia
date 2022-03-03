<script lang="ts">
	import { page } from "$app/stores";
	import { locale, supportedLocales } from "@core/i18n";

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

	$: path = $page.url.pathname;
	$: href = stripLangParam(path);
</script>

<nav class="lang-select flex-center" {title}>
	<ul class="flex-center">
		{#each supportedLocales as language}
			<li>
				<a href={`/${language}/${href}`} class:active={$locale === language}>
					{language}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
  .lang-select {
    font-size: var(--font-size-s);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-s);
  }

	a {
		display: flex;
		text-transform: uppercase;
		padding: var(--space-xs);
		font-weight: 600;
		color: var(--color-text-secondary);
	}
	
	.lang-select a:hover {
		--bg: var(--color-blue-600);
	}

	a.active {
		background-color: var(--surface-2);
		color: var(--color-link);
	}
</style>