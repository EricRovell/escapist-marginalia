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

<nav class="lang-select" {title}>
	<Icon path={iconLocale} color="primary" />
	<ul>
		{#each [ "en", "ru" ] as language}
			<li>
				<a href={`/${language}/${href}`} class:active={$lang === language}>
					{language}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
  .lang-select {
    display: flex;
    justify-content: center;
    align-items: center;
		gap: var(--space-xs);
    font-size: var(--font-size-2);
		border: var(--border-1);
		padding-left: var(--space-xs);
  }

	.lang-select ul {
		display: flex;
    justify-content: center;
    align-items: center;
	}

	a {
		--color: var(--color-gray-700);
		--bg-opacity: 0;

		display: flex;
		text-transform: uppercase;
		padding: var(--space-xs);
		color: var(--color);
		font-weight: 600;
		background-color: hsl(var(--primary-h) var(--primary-s) var(--primary-l) / var(--bg-opacity));
	}
	
	.lang-select a:hover {
		--color: var(--color-gray-100);
		--bg-opacity: 1;
	}

	a.active {
		--color: var(--color-gray-100);
		--bg-opacity: 0.75;
	}
</style>