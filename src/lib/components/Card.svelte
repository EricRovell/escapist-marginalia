<script lang="ts">
	import { Datetime } from "@components";

	export let title: string;
	export let href: string | undefined = undefined;
	export let date: Date | undefined = undefined;
</script>

<article>
	<header>
		<a {href}>
			<h3>{title}</h3>
		</a>
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
		font-size: var(--font-size-4);
	}

	footer {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		gap: var(--space-s);
	}

	a:hover {
		color: var(--color-primary);
	}
</style>