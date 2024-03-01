<script context="module" lang="ts">
	export interface Heading {
		level: number;
		title: string;
		id: string;
	}
</script>

<script lang="ts">
	import { Details, Link } from "@components";
	import { encodeTitleId } from "@utils/helpers";
	import { t } from "@core/i18n";
	import styles from "./toc.module.css";

	export let headings: Heading[] = [];
	export let title: string;
</script>

<Details>
	<header slot="title">
		<h2 class="{styles.title}">
			{$t("message.toc")}
		</h2>
	</header>
	<nav class="{styles.toc}">
		<ol class="{styles["toc-items"]}">
			<li style="--toc-level: 1;" class="{styles["toc-item"]}">
				<Link href="#{encodeTitleId(title)}">
					{title}
				</Link>
			</li>
			{#each headings as { level, title, id }}
				<li style="--toc-level: {level};" class="{styles["toc-item"]}">
					<Link href={`#${id}`}>
						{title}
					</Link>
				</li>
			{/each}
		</ol>
	</nav>
</Details>
