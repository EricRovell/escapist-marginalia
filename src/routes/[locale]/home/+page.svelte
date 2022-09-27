<script lang="ts">
	import { pathBlog, pathGallery, pathProjects } from "@paths";
	import { PageMeta, Link, CardArticle, CardProject, Gallery } from "@components";
	import { LayoutPage } from "@layout";
	import { t } from "@core/i18n";
	import type { PageData } from "./$types";
	import styles from "./home.module.css";

	export let data: PageData = {};
</script>

<PageMeta route="home" />

<LayoutPage classNameContent={styles.page} wide>
	<svelte:fragment slot="banner">
		<h1 class="headline">
			{$t("pages.home.title")}
		</h1>
		<p class="headline">
			{$t("pages.home.description")}
		</p>
	</svelte:fragment>
	<div class={styles.layout}>
		<section label="recent-posts">
			<div>
				<header>
					<h2 class="heading">{$t("dict.recent-posts")}</h2>
					<Link href={$pathBlog}>
						&#x2192; {$t("dict.all-posts")}
					</Link>
				</header>
				<ul class="grid-flexible" style="--item-size: 28ch">
					{#each data.blogposts as { created, description, keywords, title, slug }}
						<li>
							<CardArticle
								{created}
								{description}
								{keywords}
								{title}
								{slug}
							/>
						</li>
					{/each}
				</ul>
			</div>
		</section>
		<section class="surface-2" label="recent-photos">
			<div>
				<header>
					<h2 class="heading">{$t("dict.recent-photos")}</h2>
					<Link href={$pathGallery}>
						&#x2192; {$t("dict.entire-gallery")}
					</Link>
				</header>
				<Gallery items={data.photos} />
			</div>
		</section>
		<section label="featured-projects">
			<div>
				<header>
					<h2 class="heading">{$t("dict.featured-projects")}</h2>
					<Link href={$pathProjects}>
						&#x2192; {$t("dict.all-projects")}
					</Link>
				</header>
				<ul class="grid-flexible" style="--item-size: 25ch">
					{#each data.projects as { name, description, github, npm, homepage, techstack, type }}
						<li>
							<CardProject
								{description}
								{github}
								{homepage}
								{npm}
								{name}
								{techstack}
								{type}
							/>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	</div>
</LayoutPage>
