<script context="module" lang="ts">
	import { writable } from "svelte/store";
	import { preventPageScroll } from "utils";

	const createStore = () => {
		const { subscribe, update } = writable<string | undefined>();

		return {
			subscribe,
			set: (value?: string) => {
				update(oldValue => {
					if (!oldValue && value) {
						preventPageScroll(true);
					}

					if (oldValue && !value) {
						preventPageScroll(false);
					}

					return value;
				});
			}
		};
	};

	const current = createStore();
</script>

<script lang="ts">
	import { afterUpdate } from "svelte";
	import { afterNavigate } from "$app/navigation";
	import { shortcut, swipable, portal, type SwipeEvent } from "../../actions";
	import styles from "./drawer.module.css";

	export let className = "";
	export let name: string;
	export let show = false;

	export const toggle = () => {
		show = !show;
	};

	const handleSwipe = (event: CustomEvent<SwipeEvent>) => {
		if (event.detail.direction === "down") {
			show = false;
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

	afterNavigate(() => {
		show = false;
	});

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
