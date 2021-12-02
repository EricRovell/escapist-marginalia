<script lang="ts">
	import Datetime from "./Datetime.svelte";
	import Link from "./Link.svelte";

	export let title: string;
	export let href: string | undefined = undefined;
	export let date: Date | undefined = undefined;
</script>

<article>
	<header>
		{#if href}
			<Link {href}>
				<h3>{title}</h3>
			</Link>
		{:else}
			<h3>{title}</h3>
		{/if}
	</header>
	<slot />
	{#if $$slots.footer || date}
		<footer>
			<slot name="footer" />
			{#if date}
				<Datetime {date} />
			{/if}
		</footer>
	{/if}
</article>

<style>
	article {
		display: grid;
		gap: var(--space-m);
		border: var(--border-1);
		border-radius: var(--radius-small);
		padding: var(--space-m);
	}

	article h3 {
		font-size: var(--font-size-3);
		font-weight: 600;
	}

	footer {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		gap: var(--space-s);
		font-size: var(--font-size-1);
		color: hsl(var(--gray-h) var(--gray-s-700) var(--gray-l-700));
	}
</style>