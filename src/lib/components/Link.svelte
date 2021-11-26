<script lang="ts">
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
	{href}
	{target}
	{rel}
	{title}
	{...$$restProps}
	class:disabled
	tabIndex={disabled ? -1 : undefined}
	>
		<slot />
</a>

<style>
	a {
		color: var(--link-color);
		font-size: inherit;
	}

	a:hover {
		color: var(--link-color-active);
		text-decoration: underline;
	}

	a:focus-visible {
		outline: 1.5px dashed var(--link-color-active);
		outline-offset: calc(var(--space-xs) / 2);
	}

	a:active {
		color: var(--link-color-active);
		background-color: var(--link-bg-active);
	}

	.disabled {
    pointer-events: none;
    opacity: 0.7;
    text-decoration: line-through;
  }
</style>