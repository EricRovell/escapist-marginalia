<script lang="ts">
	import { Link } from "./link";
	import Datetime from "./Datetime.svelte";
	import NavLocale from "./nav-locale/NavLocale.svelte";
	import Icon from "./icons/Icon.svelte";
	import { iconGithub, iconRSS } from "./icons/default";
	import { t } from "@core/i18n";

	import {
		pathSource,
		pathLicence,
		pathPrivacy,
		pathBlog,
		pathGallery,
		pathRSS,
		pathAbout
	} from "@core/paths";

	$: links = [
		{ label: "blog", href: $pathBlog },
		{ label: "gallery", href: $pathGallery },
		{ label: "licence", href: pathLicence },
		{ label: "privacy", href: pathPrivacy, disabled: true },
		{ label: "about", href: $pathAbout, disabled: true }
	];

	$: icons = [
		{ label: "source", href: pathSource, icon: iconGithub },
		{ label: "rss", href: $pathRSS, icon: iconRSS },
	];
</script>

<footer class="surface-2">
	<div class="container wrapper">
		<nav>
			<ul>
				{#each links as { label, href, disabled = false }}
					<li>
						<Link {href} {disabled}>
							{$t(`sections.${label}`)}
						</Link>
					</li>
				{/each}
			</ul>
		</nav>
		<nav class="socials">
			<ul>
				{#each icons as { label, href, icon }}
					<li>
						<Link block {href}>
							<Icon path={icon} title={$t(`sections.${label}`)} />
						</Link>
					</li>
				{/each}
			</ul>
		</nav>
		<section label="user">
			<p>
				<span>
					© <Datetime options={{ year: "numeric" }} />, Eric/Rovell
				</span>
				<span>{$t("message.build-at")} <Datetime date={"__buildTime__"} /></span>
			</p>
			<NavLocale labeled />
		</section>
	</div>
</footer>

<style>
	footer {
		grid-area: footer;

		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 25vh;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-3);
		width: 100%;
		height: 100%;
		padding-top: var(--space-7);
		padding-bottom: var(--space-7);
		border-top: 2px solid var(--color-border);

		justify-self: center;
	}

	section[label="user"] {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: var(--space-3-rel);
		width: 100%;
		font-size: var(--font-size-0);
	}

	.socials {
		--icon-size: 1.5em;
	}

	nav ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-end;
		text-transform: capitalize;
		gap: var(--space-3-rel);
	}

	p {
		display: flex;
		flex-flow: column nowrap;
		gap: var(--space-2);
	}

	p :global(time) {
		color: var(--surface-2-text-contrast);
	}

	@media (max-width: 540px) {
		.wrapper {
			grid-template: repeat(2, 1fr) / 1fr;
			justify-items: center;
		}
	}

	@media (max-width: 650px) {
		.wrapper {
			/* floating button offset */
			padding-bottom: 6rem;
		}

		section[label="user"] {
			flex-direction: column-reverse;
			align-items: center;
		}

		p {
			align-items: center;
		}
	}
</style>