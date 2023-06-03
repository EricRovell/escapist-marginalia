<script lang="ts">
	import { Link, Icon, Datetime } from "@components";
	import { iconGithub, iconNpm, iconURL } from "$lib/components/icons/default";
	import { t } from "@core/i18n";
	import type { Project } from "@types";
	import styles from "./project-header.module.css";

	export let description: Project["description"];
	export let name: Project["name"];
	export let npm: Project["npm"];
	export let repository: Project["repository"];
	export let techstack: Project["techstack"] = [];
	export let website: Project["website"];
	export let updated: Project["updated"];

	const links = [
		{ href: repository, title: "Github", icon: iconGithub },
		{ href: npm, title: "NPM", icon: iconNpm },
		{ href: website, title: "Website", icon: iconURL }
	].filter(({ href }) => href);
</script>

<div class={styles.wrapper}>
	<h1>
		{name}
	</h1>
	<p>{description}</p>
	<p>{$t("message.updated")} <Datetime date="{updated}" /></p>
	<footer>
		<ul class="{styles.keywords}">
			{#each techstack as keyword}
				<li class="surface-4">
					{keyword}
				</li>
			{/each}
		</ul>
		<ul class="{styles.links}">
			{#each links as { href, icon, title }}
				<li>
					<Link {href} {title}>
						<Icon path="{icon}" />
						{title}
					</Link>
				</li>
			{/each}
		</ul>
	</footer>
</div>
