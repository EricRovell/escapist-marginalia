<script lang="ts">
	import { Gallery, Icon, Link } from "ui";
	import { iconArrowTop } from "ui/icons";

	import { pathWriting, pathGallery, pathProjects, pathBlogpost, pathSketch } from "@paths";
	import { PageMeta, Card } from "@components";
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
		<div class="{styles.wrapper}">
			<section aria-label="recent-posts">
				<header>
					<Link href={$pathWriting}>
						<h2 class="heading">{$t("dict.recent-posts")}</h2>
					</Link>
				</header>
				<div class="{styles["content-wrapper"]}">
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
		</div>
		<div class="{styles.wrapper}">
			<section aria-label="featured-projects">
				<header>
					<Link href={$pathProjects}>
						<h2 class="heading">{$t("dict.featured-projects")}</h2>
					</Link>
				</header>
				<div class="{styles["content-wrapper"]}">
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
		</div>
		<div class="{styles.wrapper}">
			<section aria-label="featured-sketches">
				<header>
					<Link href={$pathSketch}>
						<h2 class="heading">{$t("dict.recent-sketches")}</h2>
					</Link>
				</header>
				<div class="{styles["content-wrapper"]}">
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
		</div>
		<div class="{styles.wrapper}">
			<section aria-label="recent-photos">
				<div>
					<header>
						<Link href={$pathGallery}>
							<h2 class="heading">{$t("dict.recent-photos")}</h2>
						</Link>
					</header>
					<Gallery items={data.gallery} />
				</div>
			</section>
		</div>
		<aside class="{styles.aside}">
			<Link href="#app">
				<Icon path="{iconArrowTop}" />
				{$t("dict.back-to-top")}
			</Link>
		</aside>
	</div>
</LayoutPage>
