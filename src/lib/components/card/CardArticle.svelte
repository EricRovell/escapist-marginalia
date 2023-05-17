<script lang="ts" context="module">
	import type { Blogpost } from "@types";
</script>

<script lang="ts">
	import Datetime from "../Datetime.svelte";
	import { Link } from "../link";
	import { Image } from "../image";
	import { pathBlogpost } from "@core/paths";
	import stylesCard from "./card.module.css";
	import styles from "./card-article.module.css";

	export let cover: Blogpost["cover"];
	export let created: Blogpost["created"];
	export let description: Blogpost["description"];
	export let keywords: Blogpost["keywords"];
	export let title: Blogpost["title"];
	export let slug: Blogpost["slug"];
</script>

<article class="surface-2 {stylesCard.card} {styles.card}">
	<Image
		alt="The article cover image"
		height="{500}"
		lazy
		src="{cover}"
		width="{500}"
	/>
	<Datetime
		date={created}
		options={{ month: "long", day: "numeric", year: "numeric" }}
	/>
	<h3>
		<Link	href={$pathBlogpost(slug)}>
			{title}
		</Link>
	</h3>
	<p class="line-clamp" style="--line-count: 3">
		{description}
	</p>
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
</article>
