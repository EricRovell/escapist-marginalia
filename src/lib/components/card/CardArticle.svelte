<script lang="ts" context="module">
	import type { Blogpost } from "@types";
</script>

<script lang="ts">
	import Card from "./Card.svelte";
	import Datetime from "../Datetime.svelte";
	import Link from "../Link.svelte";

	import { pathBlogpost } from "@core/paths";
	import styles from "./card-article.module.css";

	export let created: Blogpost["created"];
	export let description: Blogpost["description"];
	export let keywords: Blogpost["keywords"];
	export let title: Blogpost["title"];
	export let slug: Blogpost["slug"];
</script>

<!--
	locale={$locale}
-->
<Card className={styles["card-article"]}>
	<svelte:fragment slot="header">
		<Datetime
			date={created}
			options={{ month: "long", day: "numeric", year: "numeric" }}
		/>
		<Link	href={$pathBlogpost(slug)}>
			<h3>
				{title}
			</h3>
		</Link>
	</svelte:fragment>
	<p class="line-clamp" style="--line-count: 3">
		{description}
	</p>
	<svelte:fragment slot="footer">
		<ul class={styles.keywords}>
			{#each keywords as keyword}
				<li>
					<span class={styles.keyword}>
						{keyword}
					</span>
				</li>
			{/each}
		</ul>
	</svelte:fragment>
</Card>