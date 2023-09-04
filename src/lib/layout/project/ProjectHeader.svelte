<script lang="ts">
	import { Link, Icon, Datetime } from "@components";
	import { iconGithub, iconNpm, iconURL } from "@icons";
	import { t } from "@core/i18n";
	import type { Project } from "@types";
	import styles from "./project-header.module.css";

	export let dateUpdated: Project["dateUpdated"];
	export let description: Project["description"];
	export let title: Project["title"];
	export let npm: Project["npm"];
	export let repository: Project["repository"];
	export let techstack: Project["techstack"] = [];
	export let website: Project["website"];

	const links = [
		{
			href: repository,
			title: "Github",
			icon: iconGithub,
			builder: (repository: string) => `https://github.com/${repository}`
		},
		{
			href: npm,
			title: "NPM",
			icon: iconNpm,
			builder: (packageName: string) => `https://www.npmjs.com/package/${packageName}`
		},
		{
			href: website,
			title: "Website",
			icon: iconURL
		}
	].filter(({ href }) => href);
</script>

<div class={styles.wrapper}>
	<h1>
		{title}
	</h1>
	<p>{description}</p>
	<p>{$t("message.updated")} <Datetime date="{dateUpdated}" /></p>
	<footer>
		<ul class="{styles.keywords}">
			{#each techstack as keyword}
				<li class="surface-4">
					{keyword}
				</li>
			{/each}
		</ul>
		<ul class="{styles.links}">
			{#each links as { href, icon, title, builder }}
				<li>
					<Link href={builder ? builder(href) : href} {title}>
						<Icon path="{icon}" />
						{title}
					</Link>
				</li>
			{/each}
		</ul>
	</footer>
</div>
