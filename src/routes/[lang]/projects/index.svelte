<script context="module" lang="ts">
	import type { Project } from "@types";

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
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
	}
</script>

<script lang="ts">
	import { _ } from "@core/i18n";
	import { Card, Icon } from "@components";
	import { iconGithub, iconNpm, iconURL } from "@components/icons/default";
	import { groupBy } from "@lib/util";

	export let projects: Project[] = [];

	$: groupedProjects = Object.entries(groupBy(projects, project => project.type));
</script>

<main>
	{#each groupedProjects as [ category, projects ]}
		<section>
			<h2>
				{$_(`categories.${category}`)}
			</h2>
			<ul>
				{#each projects as { name, description, github, packageName, homepage }}
					<li>
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

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: var(--space-l);
		width: 100%;
	}

	h2 {
		font-size: var(--font-size-6);
		margin-bottom: var(--space-m);
		text-transform: capitalize;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
		gap: var(--space-m);
	}

	li {
		display: contents;
	}
</style>