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

	article :global(h2),
	article :global(h3),
	article :global(h4),
	article :global(h5),
	article :global(h6) {
		margin-top: var(--spacing-6);
	}
</style>