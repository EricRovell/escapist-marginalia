<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { preventPageScroll } from "$lib/utils/helpers";
	import { shortcut, swipable, type SwipeEvent } from "$lib/actions";
	import styles from "./drawer.module.css";

	export let className = "";
	/**
	 * Should content be hidden when threshold is not met.
	 */
	export let hidden = false;
	export let show = false;

	export const close = () => show = false;
	export const open = () => show = true;
	export const toggle = () => show = !show;

	const handleSwipe = (event: CustomEvent<SwipeEvent>) => {
		if (event.detail.direction === "down") {
			show = false;
		}
	};

	afterNavigate(() => {
		show = false;
	});

	$: preventPageScroll(show);
</script>

<div
	class="{styles.wrapper} {className}"
	class:show
	class:hidden
	use:swipable={{ threshold: 50, timeout: 1000 }}
	use:shortcut={{
		active: show,
		code: "Escape",
		callback: close
	}}
	on:swipe-down={handleSwipe}
>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class={styles.backdrop}
		class:show
		on:click={toggle}
	/>
	<article
		class={styles["menu-body"]}
		class:show
		label="drawer"
	>
		<slot />
	</article>
	<slot
		name="toggle"
		{toggle}
		{show}
	/>
</div>
