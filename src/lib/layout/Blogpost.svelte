<script>
	/* eslint-disable @typescript-eslint/restrict-template-expressions */
	import { theme } from "@stores";

	export let title;

	$: highlight = $theme === "dark" ? "dark" : "light";
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<link rel="stylesheet" href={`/styles/prism-${highlight}.css`} />
</svelte:head>

<header>
	<h1>{title}</h1>
</header>
<article>
	<slot />
</article>

<style>
	header {
		display: grid;
		gap: 0.75em;
		width: 100%;
		margin-bottom: 10vh;
	}

	h1 {
		text-align: center;
	}

	article {
		display: grid;
		width: min(65ch, 100%);
		justify-self: center;
		gap: 0.75em;
	}

	article :global(:is(h1, h2, h3, h4, h5, h6)) {
		--border-size: 2px;

		margin-top: calc(8 * var(--spacing-em-base));
		padding-bottom: var(--spacing-2);
		border-bottom: solid var(--border-size) hsl(var(--gray-h) var(--gray-s-600) var(--gray-l-600) / 0.5);

		text-decoration: underline;
		text-decoration-color: var(--color-gray-800);
		text-underline-offset: calc(var(--spacing-2) + var(--border-size));
	}
</style>