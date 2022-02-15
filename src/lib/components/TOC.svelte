<script context="module" lang="ts">
	export interface Heading {
		level: number;
		title: string;
		id: string;
	}
</script>

<script lang="ts">
	import { Link } from "@components";
	import { t } from "@core/i18n";

	export let headings: Heading[] = [];
</script>

<nav>
	<h2>{$t("message.toc")}</h2>
	<ol>
		{#each headings as { level, title, id }}
			<li style="--toc-level: {level - 2};">
				<Link href={`#${id}`}>
					{title}
				</Link>
			</li>
		{/each}
	</ol>
</nav>

<style>
	nav {
		font-size: var(--font-size-2);
		height: min-content;
	}

	h2 {
		margin-bottom: var(--space-m);
		font-size: var(--font-size-4);
	}

	ol {
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
	}

	li {
		margin-left: calc(var(--toc-level) * 0.5em);
	}
</style>