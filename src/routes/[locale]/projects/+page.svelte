<script lang="ts">
	import { t, locale } from "@core/i18n";
	import { PageMeta, Card } from "@components";
	import { LayoutPage } from "@layout";
	import type { Project } from "@types";
	import type { PageLoad } from "./$types";
	import styles from "./projects.module.css";

	export let data: PageLoad = [];

	let projects: Project[];
	$: projects = data.items.filter(item => item.lang === $locale);
</script>

<PageMeta route="projects" />

<LayoutPage>
	<svelte:fragment slot="banner">
		<h1 class="headline">
			{$t("pages.projects.title")}
		</h1>
		<p class="headline">
			{$t("pages.projects.description")}
		</p>
	</svelte:fragment>
	<article class={styles.layout}>
		<ul class={styles.projects}>
			{#each projects as { cover, dateUpdated, description, keywords, title, slug }}
				<li class={styles.project}>
					<Card
						{cover}
						date="{dateUpdated}"
						{description}
						href="{slug}"
						{title}
						{keywords}
					/>
				</li>
			{/each}
		</ul>
	</article>
</LayoutPage>
