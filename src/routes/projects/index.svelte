<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }) {
		const res = await fetch("/data/projects.json");

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
	import { Card, Icon } from "@components";
	import { iconGithub, iconNpm } from "@components/icons/default";
	import type { Project } from "@types";

	export let projects: Project[] = [];
</script>

<ul>
	{#each projects as { name, description, repository, npm }}
		<li>
			<Card	title={name}>
				<p>{description}</p>
				<svelte:fragment slot="footer">
					<a href={repository} title="Github repository">
						<Icon path={iconGithub} size="1.25em" />
					</a>
					<a href={npm} title="NPM package">
						<Icon path={iconNpm} color="danger" size="1.25em" />
					</a>
				</svelte:fragment>
			</Card>
		</li>
	{/each}
</ul>

<style>
	ul {
		justify-self: center;

		display: grid;
		gap: var(--spacing-4);
	}
</style>