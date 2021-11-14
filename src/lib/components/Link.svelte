<script lang="ts">
	export let href: string;
	export let targetBlank = false;
	export let nofollow = false;
	export let disabled = false;
	export let prefetch: true | undefined = undefined;

	// if no `href` is provided -> link will be disabled
	$: disabled = href ? disabled : true;
	$: external = href.indexOf("://") !== -1;
	$: target = (targetBlank || external) ? "_blank" : "";
	$: rel = `${external ? "noopener noreferrer" : ""}` + `${nofollow ? "nofollow" : ""}`;
</script>

<a
	{href}
	{target}
	{rel}
	{...$$restProps}
	class:disabled
	sapper:prefetch={!external || prefetch}
	>
		<slot />
</a>

<style>
	a {
		color: inherit;
		font-size: inherit;
	}

	.disabled {
    pointer-events: none;
    color: var(--color-gray-300);
    text-decoration: line-through;
  }
</style>