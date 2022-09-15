<script lang="ts">
	export let block = false;
	export let className: string | undefined = undefined;
	export let download: undefined | string = undefined;
	export let href: string;
	export let targetBlank = false;
	export let nofollow = false;
	export let disabled = false;
	export let title: string | undefined = undefined;

	// if no `href` is provided -> link will be disabled
	$: disabled = href ? disabled : true;
	$: external = href.indexOf("://") !== -1;
	$: target = (targetBlank || external) ? "_blank" : undefined;
	$: rel = `${external ? "noopener noreferrer" : ""}` + `${nofollow ? "nofollow" : ""}`;
</script>

<a
	class={className}
	class:block
	{download}
	{href}
	{target}
	{rel}
	{title}
	{...$$restProps}
	aria-disabled={disabled ? "true" : undefined}
	class:disabled
	tabIndex={disabled ? -1 : undefined}
	>
		<slot />
</a>

<style>
	a {
		align-items: baseline;
		color: var(--color-link);
		font-size: inherit;
	}

	a:not(.disabled):hover {
		color: var(--color-link-hover, currentColor);
		text-decoration: underline;
	}

	a:focus-visible {
		outline-color: var(--color-link-hover, currentColor);
	}

	a:active {
		color: var(--color-link-active);
		background-color: var(--color-link-active-bg);
	}

	a[aria-disabled="true"] {
		cursor: not-allowed;
		opacity: 0.7;
    text-decoration: line-through;
	}

	a[aria-disabled="true"]:active {
		pointer-events: none;
	}

	a.block {
		display: flex;
		align-items: center;
		gap: var(--space-1-rel);
	}
</style>