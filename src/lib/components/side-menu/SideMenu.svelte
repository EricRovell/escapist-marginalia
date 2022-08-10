<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import SideMenuBody from "./SideMenuBody.svelte";
	import SideMenuSwitch from "./SideMenuSwitch.svelte";
	import { preventPageScroll } from "$lib/utils/helpers";
	import styles from "./side-menu.module.css";

	export let size = "2rem";
	let show = false;

	const switchMenu = () => show = !show;

	afterNavigate(() => show = false);

	$: preventPageScroll(show);
</script>

<aside class={styles.wrapper} class:show style:--switch-size="{size}">
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
