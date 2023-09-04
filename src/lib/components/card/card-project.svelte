<script lang="ts" context="module">
	import type { Project } from "@types";
</script>

<script lang="ts">
	import { pathProject } from "@core/paths";
	import { Link } from "../link";
	import stylesCard from "./card.module.css";
	import styles from "./card-project.module.css";

	export let description: Project["description"];
	export let title: Project["title"];
	export let techstack: Project["techstack"] = [];
</script>

<article class="surface-2 {stylesCard.card} {styles.card}">
	<h3>
		<Link href="{$pathProject(title)}">
			{title}
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
	</footer>
</article>
