<script context="module" lang="ts">
	import type { Project } from "@types";

	interface ProjectsCategories {
		[key: string]: Project[];
	}

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const res = await fetch("/api/projects/categories.json");

		if (res.ok) {
			return {
				props: {
					categories: await res.json()
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
	import { Card, Icon } from "@components";
	import { iconGithub, iconNpm, iconURL } from "@components/icons/default";

	export let categories: ProjectsCategories = {};
</script>

<main>
	{#each Object.entries(categories) as [ category, projects ]}
		<section>
			<h2>{category}</h2>
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
		gap: 1em;
		width: 100%;
		padding: 0 var(--spacing-rem-2, 0.5rem);
	}

	h2 {
		margin-bottom: 0.5em;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.25rem;
		width: 100%;
		align-items: stretch;
	}

	li {
		display: contents;
	}
</style>