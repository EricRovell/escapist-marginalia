<script lang="ts">
	import { Link } from "ui";

	import { t } from "@core/i18n";
	import { PageMeta } from "$lib/components";
	import { LayoutPage } from "@layout";
	import type { PageData } from "./$types";
	import styles from "./bookmarks.module.css";

	export let data: PageData = {};
</script>

<PageMeta route="bookmarks" />

<LayoutPage>
	<svelte:fragment slot="banner">
		<h1 class="headline">
			{$t("pages.bookmarks.title")}
		</h1>
		<p class="headline">
			{$t("pages.bookmarks.description")}
		</p>
	</svelte:fragment>
	<main class="{styles.wrapper}">
		<article>
				<ul class="{styles.bookmarks}">
					{#each data.items as { category, description, title, topics, url  }}
						<li class="{styles.bookmark}">
							<Link className="{styles.link}" href="{url}">
								<p>{category}</p>
								<h3>{title}</h3>
								<p>{description}</p>
								<ul class="{styles.topics}">
									{#each topics as topic}
										<li>{topic}</li>
									{/each}
								</ul>
							</Link>
						</li>
					{/each}
				</ul>
		</article>
	</main>
</LayoutPage>
