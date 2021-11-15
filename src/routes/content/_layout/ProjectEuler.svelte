<script context="module">
	import { default as code } from "./Code.svelte";
	export { code };
</script>

<script>
	import styles from "./blogpost.module.css";
	import "katex/dist/katex.min.css";

	import { _ } from "@core/i18n";
	import { Link } from "@components";

	export let title;
	export let references = [];
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<!--
	@component
	
	Layout for blogposts about Project Euler, so the math & code highlight are included.
-->
<article class={styles.article}>
	<header class={styles.header}>
		<h1>{title}</h1>
	</header>
	<main>
		<slot name="problem" class={styles.problem} />
		<slot />
	</main>
	{#if references.length}
		<footer class={styles.footer}>
			<h2>{$_("message.reference-list")}</h2>
			<ol>
				{#each references as { label, href }}
					<li>
						<Link {href}>
							{label}
						</Link>
					</li>
				{/each}
			</ol>
		</footer>
	{/if}
</article>