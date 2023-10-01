<script lang="ts">
	import { t, locale } from "@core/i18n";
	import { PageMeta, CardProject } from "@components";
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
			{#each projects as { description, title, techstack }}
				<li class={styles.project}>
					<CardProject
						{description}
						{title}
						{techstack}
					/>
				</li>
			{/each}
		</ul>
	</article>
</LayoutPage>
