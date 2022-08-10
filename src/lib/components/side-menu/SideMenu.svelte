<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import SideMenuBody from "./SideMenuBody.svelte";
	import SideMenuSwitch from "./SideMenuSwitch.svelte";
	import { preventPageScroll } from "$lib/utils/helpers";
	import { swipable } from "$lib/actions";
	import styles from "./side-menu.module.css";

	import type { SwipeEvent } from "$lib/actions";

	export let size = "2rem";
	let show = false;

	const switchMenu = () => show = !show;

	afterNavigate(() => show = false);

	$: preventPageScroll(show);

	const handleSwipe = (event: CustomEvent<SwipeEvent>) => {
		if (event.detail.direction === "down") {
			show = false;
		}
	};
</script>

<aside
	class={styles.wrapper}
	class:show style:--switch-size="{size}"
	use:swipable={{ threshold: 50, timeout: 1000 }}
	on:swipe-down={handleSwipe}
>
	<div class={styles.backdrop} class:show on:click={switchMenu} />
	<SideMenuBody bind:show>
		<slot />
	</SideMenuBody>
	<SideMenuSwitch
		bind:show
		on:click={switchMenu}
	>
		<slot name="title" />
	</SideMenuSwitch>
</aside>
