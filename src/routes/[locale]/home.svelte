<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import type { Blogpost, Project, GalleryItem } from "../../types";

	export const load: Load = async ({ fetch }) => {

		const requests = [
			fetch("/api/posts"),
			fetch("/api/photos"),
			fetch("/api/projects")
		];

		const responses = await Promise.all(requests);
		const [ posts, photos, projects ] = await Promise.all(responses.map(r => r.json()));

		if (responses.every(r => r.ok)) {
			return {
				props: {
					posts: posts.slice(0, 5),
					photos: photos.slice(0, 4),
					projects: projects.slice(0, 4)
				}
			};
		}

		for (let response of responses) {
			if (!response.ok) {
				return {
					status: response.status,
					error: new Error("Could not load URL")
				};
			}
		}
	};
</script>

<script lang="ts">
	import { pathBlog, pathGallery, pathProjects } from "@paths";
	import { PageMeta, Link, Image, CardArticle, CardProject, GalleryGrid } from "@components";
	import { LayoutPage } from "@layout";
	import { t } from "@core/i18n";
	import styles from "./.home.module.css";

	export let posts: Blogpost[] = [];
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
					{#each posts as { created, description, keywords, title, slug }}
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