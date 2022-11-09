<script lang="ts" context="module">
	import type { Project } from "@types";
</script>

<script lang="ts">
	import { pathProject } from "@core/paths";
	import Icon from "../icons/Icon.svelte";
	import { Link } from "../link";

	import { iconGithub, iconNpm, iconURL } from "../icons/default";
	import styles from "./card-project.module.css";

	export let description: Project["description"];
	export let name: Project["name"];
	export let npm: Project["npm"];
	export let repository: Project["repository"];
	export let techstack: Project["techstack"] = [];
	export let website: Project["website"];

	const links = [
		{ href: repository, title: "Github", icon: iconGithub },
		{ href: npm, title: "NPM", icon: iconNpm },
		{ href: website, title: "Website", icon: iconURL }
	].filter(({ href }) => href);
</script>

<article class="surface-2 {styles["card"]}">
	<h3>
		<Link href="{$pathProject(name)}">
			{name}
		</Link>
	</h3>
	<p class="line-clamp" style="--line-count: 3">
		{description}
	</p>
	<footer>
		<ul class={styles.techstack}>
			{#each techstack as item}
				<li>{item}</li>
			{/each}
		</ul>
		<ul class="{styles.links}">
			{#each links as { href, icon, title }}
				<li>
					<Link {href} {title}>
						<Icon path="{icon}" />
					</Link>
				</li>
			{/each}
		</ul>
	</footer>
</article>
