<script lang="ts" context="module">
	import type { Project } from "@types";
</script>

<script lang="ts">
	import Card from "./Card.svelte";
	import Icon from "../icons/Icon.svelte";
	import Link from "../Link.svelte";

	import { iconGithub, iconNpm, iconURL } from "../icons/default";
	import styles from "./card-project.module.css";

	export let description: Project["description"];
	export let title: Project["title"];
	export let github: Project["github"];
	export let npm: Project["npm"];
	export let homepage: Project["homepage"];

	$: links = [
		{ property: github, title: "Github", icon: iconGithub },
		{ property: npm, title: "NPM", icon: iconNpm },
		{ property: homepage, title: "Website", icon: iconURL }
	].filter(({ property }) => property);
</script>

<!--
	locale={$locale}
-->
<Card className={`surface-2 ${styles["card-project"]}`}>
	<svelte:fragment slot="header">
		<h3>
			{title}
		</h3>
	</svelte:fragment>
	<p class="line-clamp" style="--line-count: 3">
		{description}
	</p>
	<svelte:fragment slot="footer">
		<ul class={styles.links}>
			{#each links as { property, title, icon }}
				<li>
					<Link href={property} {title}>
						<Icon path={icon} />
						{title}
					</Link>
				</li>
			{/each}
		</ul>
	</svelte:fragment>
</Card>