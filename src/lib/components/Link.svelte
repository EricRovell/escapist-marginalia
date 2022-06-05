<script lang="ts">
	export let className: string | undefined = undefined;
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
		display: inline-flex;
		align-items: baseline;
		gap: var(--space-xs);
		color: var(--color-link);
		font-size: inherit;
	}

	a:not(.disabled):hover {
		color: var(--color-link-hover, currentColor);
		text-decoration: underline;
	}

	a:focus-visible {
		outline: 2px dashed var(--color-link-hover, currentColor);
		outline-offset: calc(var(--space-xs) / 2);
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
</style>