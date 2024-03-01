<script context="module" lang="ts">
	import type { MetaTags, Alternate, Twitter, OpenGraph } from "./meta.types";
</script>

<script lang="ts">
	export let title: string | undefined = undefined;
	export let alternate: Alternate | undefined = undefined;
	export let meta: MetaTags | undefined = undefined;
	export let twitter: Twitter | undefined = undefined;
	export let openGraph: OpenGraph | undefined = undefined;
</script>

<svelte:head>
	{#if title}
		<title>{title}</title>
	{/if}
	{#if meta}
		{#each Object.entries(meta) as [ name, content ]}
			<meta {name} {content} />
		{/each}
	{/if}
	{#if openGraph}
		{#each Object.entries(openGraph) as [ name, content ]}
			<meta property={`og:${name}`} {content} />
		{/each}
	{/if}
	{#if twitter}
		{#each Object.entries(twitter) as [ name, content ]}
			<meta name={`twitter:${name}`} {content} />
		{/each}
	{/if}
	{#if alternate}
		<link rel="alternate" {...alternate} />
	{/if}
	<slot />
</svelte:head>