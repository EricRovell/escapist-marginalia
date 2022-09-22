<script lang="ts">
	import styles from "./link.module.css";

	export let block = false;
	export let className = "";
	export let download: undefined | string = undefined;
	export let href: string;
	export let label: string | undefined = undefined;
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
	class="{styles.link} {className}"
	class:block
	{download}
	{href}
	{target}
	{rel}
	{title}
	{...$$restProps}
	aria-disabled={disabled ? "true" : undefined}
	aria-label="{label}"
	class:disabled
	tabIndex={disabled ? -1 : undefined}
	{...$$restProps}
>
		<slot />
</a>
