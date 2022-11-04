<script lang="ts">
	import { t } from "@core/i18n";
	import { PageMeta, CardProject } from "@components";
	import { LayoutPage } from "@layout";
	import type { PageLoad } from "./$types";
	import styles from "./projects.module.css";

	export let data: PageLoad = [];
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
			{#each data.items as { name, description, github, npm, homepage, techstack, type }}
				<li class={styles.project}>
					<CardProject
						{description}
						{github}
						{homepage}
						{npm}
						{name}
						{techstack}
						{type}
					/>
				</li>
			{/each}
		</ul>
	</article>
</LayoutPage>
