<script lang="ts">
	import { Icon, Link } from "@components";
	import { iconURL } from "@components/icons/default";

	export let problem: number;
</script>

<article class="euler-problem">
	<section>
		<slot />
	</section>
	<footer>
		<Link href={`https://projecteuler.net/problem=${problem}`}>
			<Icon path={iconURL} size="0.85em" /> Problem #{problem}
		</Link>
	</footer>
</article>

<style>
	.euler-problem {
		--border: solid 1px hsl(var(--gray-h) var(--gray-s-600) var(--gray-l-600) / 0.5);

		display: flex;
		flex-direction: column;

		font-size: var(--font-size-4);
		border: var(--border);
	}

	.euler-problem > section {
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
	}

	.euler-problem > footer {
		display: flex;
		align-items: center;
		border-top: var(--border);
		justify-content: flex-end;
		padding-top: var(--space-s);
		padding-bottom: var(--space-s);
	}

	.euler-problem > * {
		padding: var(--space-m);
	}
</style>