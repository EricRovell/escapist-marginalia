<script context="module" lang="ts">
	import { writable } from "svelte/store";

	const current = writable<string>();
</script>

<script lang="ts">
	import { afterUpdate } from "svelte";
	import { afterNavigate } from "$app/navigation";
	import { preventPageScroll } from "$lib/utils/helpers";
	import { shortcut, swipable, portal, type SwipeEvent } from "$lib/actions";
	import styles from "./drawer.module.css";

	export let className = "";
	export let name: string | undefined = undefined;
	export let show = false;

	export const close = () => show = false;
	export const open = () => show = true;

	export const toggle = () => {
		show ? close() : open();
	};

	const handleSwipe = (event: CustomEvent<SwipeEvent>) => {
		if (event.detail.direction === "down") {
			close();
		}
	};

	afterUpdate(() => {
		if (!name) {
			return;
		}

		if (show) {
			current.set(name);
		} else if ($current === name) {
			current.set(undefined);
		}
	});

	afterNavigate(() => close());

	$: preventPageScroll(show);

	$: if (name && $current && $current !== name) {
		show = false;
	}
</script>

<div
	class="{styles.wrapper} {className}"
	data-visible="{show ? "" : undefined}"
	use:swipable={{ threshold: 50, timeout: 1000 }}
	use:shortcut={{
		active: show,
		code: "Escape",
		callback: close
	}}
	use:portal
	on:swipe-down={handleSwipe}
>
	<div
		class={styles.backdrop}
		on:click={toggle}
		role="presentation"
	/>
	<article
		class={styles["menu-body"]}
	>
		{#if $$slots.header}
			<header>
				<slot name="header" />
			</header>
		{/if}
		<div class="{styles.content}">
			<slot />
		</div>
	</article>
	<slot
		name="toggle"
		{toggle}
		{show}
	/>
</div>
