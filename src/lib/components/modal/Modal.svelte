<script lang="ts">
	import { fade } from "svelte/transition";
	import { portal } from "@lib/actions";
	import Icon from "../icons/Icon.svelte";
	import { iconCancel } from "../icons/default";
	import { preventPageScroll } from "@lib/util";
	import styles from "./modal.module.css";

	export let open = false;

	const closeModal = () => open = false;
	const closeModalEscape = (event: KeyboardEvent) => (event.key === "Escape") && closeModal();
	
	$: preventPageScroll(open);
</script>

<svelte:window
	on:keydown={closeModalEscape}
/>

{#if open}
	<div class={styles.modal} in:fade out:fade use:portal hidden>
		<div class={styles.backdrop} on:click={closeModal} />
		<button shape="square" on:click={closeModal}>
			<Icon path={iconCancel} size="1.25rem" />
		</button>
		<div class={styles.contents}>
			<slot />
		</div>
	</div>
{/if}