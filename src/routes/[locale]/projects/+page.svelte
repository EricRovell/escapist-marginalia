<script lang="ts">
	import { t } from "@core/i18n";
	import { PageMeta, CardProject } from "@components";
	import { LayoutPage } from "@layout";
	import { groupBy } from "@utils/helpers";
	import styles from "@styles/pages/projects.module.css";
	import type { Project } from "@types";
	import type { PageLoad } from "./$types";

	export let data: PageLoad = [];

	$: groupedProjects = Object.entries<Project[]>(groupBy(data.items, project => project.type));
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
	<div class={styles.layout}>
		{#each groupedProjects as [ category, projects ]}
			<section>
				<h2 class="heading">
					{$t(`dict.${category}`)}
				</h2>
				<ul class={styles.projects}>
					{#each projects as { title, description, github, npm, homepage }}
						<li class={styles.project}>
							<CardProject 
								{description}
								{github}
								{homepage}
								{npm}
								{title}
							/>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</LayoutPage>
