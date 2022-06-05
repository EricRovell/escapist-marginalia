<script context="module" lang="ts">
	import type { Blogpost, Project, GalleryItem } from "../../types";
</script>

<script lang="ts">
	import { pathBlog, pathGallery, pathProjects } from "@paths";
	import { PageMeta, Link, Image, CardArticle, CardProject, GalleryGrid } from "@components";
	import { LayoutPage } from "@layout";
	import { t } from "@core/i18n";
	import styles from "./.home.module.css";

	export let blogposts: Blogpost[] = [];
	export let photos: GalleryItem[] = [];
	export let projects: Project[] = [];
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
				<ul class="grid-flexible" style="--item-size: 250px">
					{#each blogposts as { created, description, keywords, title, slug }}
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
		<section label="recent-photos">
			<div>
				<header>
					<h2 class="heading">{$t("dict.recent-photos")}</h2>
					<Link href={$pathGallery}>
						&#x2192; {$t("dict.entire-gallery")}
					</Link>
				</header>
				<GalleryGrid items={photos} let:item>
					<Image {...item} />
				</GalleryGrid>
			</div>
		</section>
		<section label="recent-projects">
			<div>
				<header>
					<h2 class="heading">{$t("dict.pinned-projects")}</h2>
					<Link href={$pathProjects}>
						&#x2192; {$t("dict.all-projects")}
					</Link>
				</header>
				<ul class="grid-flexible" style="--item-size: 250px">
					{#each projects as { title, description, github, npm, homepage }}
						<li>
							<CardProject
								{description}
								{github}
								{homepage}
								{npm}
								{title}
							/>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	</div>
</LayoutPage>