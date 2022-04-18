<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import type { Project } from "@types";
	
	export const load: Load = async ({ fetch }) => {
		const res = await fetch("/api/projects.json");

		if (res.ok) {
			return {
				props: {
					projects: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error("Could not load")
		};
	};
</script>

<script lang="ts">
	import { t } from "@core/i18n";
	import { PageMeta, CardProject } from "@components";
	import { LayoutPage } from "@layout";
	import { groupBy } from "@utils/helpers";
	import styles from "@styles/pages/projects.module.css";

	export let projects: Project[] = [];

	$: groupedProjects = Object.entries<Project[]>(groupBy(projects, project => project.type));
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
					{#each projects as { title, description, github, packageName, homepage }}
						<li class={styles.project}>
							<CardProject 
								{description}
								{github}
								{homepage}
								{packageName}
								{title}
							/>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</LayoutPage>
