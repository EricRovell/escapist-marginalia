<script lang="ts">
	import { pathWriting, pathGallery, pathProjects, pathBlogpost, pathSketch } from "@paths";
	import { PageMeta, Link, Card, Gallery, Icon } from "@components";
	import { iconArrowTop } from "$lib/icons";
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
		<section aria-label="recent-posts">
			<div>
				<header>
					<h2 class="heading">{$t("dict.recent-posts")}</h2>
					<Link href={$pathWriting}>
						&#x2192; {$t("dict.all-posts")}
					</Link>
				</header>
				<ul class="grid-flexible" style="--item-size: 24ch">
					{#each data.blogposts as { cover, dateCreated, description, keywords, title, slug }}
						<li>
							<Card
								{cover}
								date="{dateCreated}"
								{description}
								href={$pathBlogpost(slug)}
								{keywords}
								{title}
							/>
						</li>
					{/each}
				</ul>
			</div>
		</section>
		<section aria-label="featured-projects">
			<div>
				<header>
					<h2 class="heading">{$t("dict.featured-projects")}</h2>
					<Link href={$pathProjects}>
						&#x2192; {$t("dict.all-projects")}
					</Link>
				</header>
				<ul class="grid-flexible" style="--item-size: 25ch">
					{#each data.projects as { cover, dateUpdated, description, keywords, title, slug }}
						<li>
							<Card
								{cover}
								date="{dateUpdated}"
								{description}
								href={slug}
								{title}
								{keywords}
							/>
						</li>
					{/each}
				</ul>
			</div>
		</section>
		<section aria-label="featured-sketches">
			<div>
				<header>
					<h2 class="heading">{$t("dict.recent-sketches")}</h2>
					<Link href={$pathSketch}>
						&#x2192; {$t("dict.all-sketches")}
					</Link>
				</header>
				<ul class="grid-flexible" style="--item-size: 25ch">
					{#each data.sketches as { cover, dateUpdated, description, keywords, title, slug }}
						<li>
							<Card
								{cover}
								date="{dateUpdated}"
								{description}
								href={slug}
								{title}
								{keywords}
							/>
						</li>
					{/each}
				</ul>
			</div>
		</section>
		<section aria-label="recent-photos">
			<div>
				<header>
					<h2 class="heading">{$t("dict.recent-photos")}</h2>
					<Link href={$pathGallery}>
						&#x2192; {$t("dict.entire-gallery")}
					</Link>
				</header>
				<Gallery items={data.gallery} />
			</div>
		</section>
		<aside class="{styles.aside}">
			<Link href="#app">
				<Icon path="{iconArrowTop}" />
				{$t("dict.back-to-top")}
			</Link>
		</aside>
	</div>
</LayoutPage>
