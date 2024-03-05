<script context="module" lang="ts">
	import type { CoverImage } from "@types";
</script>

<script lang="ts">
	import { Datetime, Image, Link } from "ui";

	import { locale } from "@core/i18n";
	import styles from "./card.module.css";

	export let cover: CoverImage;
	export let date: string;
	export let description: string | undefined = undefined;
	export let href: string;
	export let keywords: string[] = [];
	export let title: string;
</script>

<article class="surface-2 {styles.card}">
	<Image
		alt="{cover.alt}"
		height="{cover.height}"
		src="{cover.src}"
		width="{cover.width}"
	/>
	<Datetime
		date={date}
		locale="{$locale}"
		options={{
			month: "long",
			day: "numeric",
			year: "numeric"
		}}
	/>
	<h3>
		<Link	{href}>
			{title}
		</Link>
	</h3>
	{#if description}
		<p class="line-clamp" style="--line-count: 3">
			{description}
		</p>
	{/if}
	{#if keywords.length}
		<footer>
			<ul class={styles.keywords}>
				{#each keywords as keyword}
					<li>
						<span class={styles.keyword}>
							{keyword}
						</span>
					</li>
				{/each}
			</ul>
		</footer>
	{/if}
</article>
