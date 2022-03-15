<script lang="ts">
	import Datetime from "./Datetime.svelte";
	import Link from "./Link.svelte";

	export let title: string;
	export let href: string | undefined = undefined;
	export let date: Date | undefined = undefined;
</script>

<article class="card">
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
	footer {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		gap: var(--space-s);
		font-size: var(--font-size-s);
	}
</style>