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
	import { PageMeta, Card, Icon } from "@components";
	import { iconGithub, iconNpm, iconURL } from "@components/icons/default";
	import { groupBy } from "@lib/util";
	import styles from "@styles/pages/projects.module.css";

	export let projects: Project[] = [];

	$: groupedProjects = Object.entries(groupBy(projects, project => project.type));
</script>

<PageMeta route="projects" />

<main class={styles.layout}>
	{#each groupedProjects as [ category, projects ]}
		<section>
			<h2>
				{$t(`categories.${category}`)}
			</h2>
			<ul class={styles.projects}>
				{#each projects as { name, description, github, packageName, homepage }}
					<li class={styles.project}>
						<Card	title={name}>
							<p>{description}</p>
							<svelte:fragment slot="footer">
								<a href={github} title="Github repository">
									<Icon path={iconGithub} size="1.25em" />
								</a>
								{#if packageName}
									<a href={`https://www.npmjs.com/package/${packageName}`} title="NPM package">
										<Icon path={iconNpm} color="danger" size="1.25em" />
									</a>
								{/if}
								{#if homepage}
									<a href={homepage} title="Live project URL">
										<Icon path={iconURL} size="1.25em" />
									</a>
								{/if}
							</svelte:fragment>
						</Card>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</main>