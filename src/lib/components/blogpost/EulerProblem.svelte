<script lang="ts">
	import { Icon, Link } from "@components";
	import { iconURL } from "@components/icons/default";

	export let problem: number;
</script>

<article class="euler-problem card">
	<section>
		<slot />
	</section>
	<footer>
		<Link href={`https://projecteuler.net/problem=${problem}`}>
			Problem #{problem}
		</Link>
	</footer>
</article>

<style>
	.euler-problem {
		display: flex;
		flex-direction: column;
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