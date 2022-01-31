<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { fade } from "svelte/transition";
	import { portal } from "@lib/actions";
	import Icon from "../icons/Icon.svelte";
	import { iconCancel } from "../icons/default";
	import { preventPageScroll } from "@lib/util";
	import styles from "./modal.module.css";

	const dispatch = createEventDispatcher();

	export let open = false;

	const closeModal = () => {
		open = false;
		dispatch("close");
	};

	const handleKeydown = (event: KeyboardEvent) => (event.key === "Escape") && closeModal();
	
	$: preventPageScroll(open);
</script>

<svelte:window
	on:keydown={handleKeydown}
/>

{#if open}
	<div class={styles.modal} in:fade out:fade use:portal hidden role="dialog" aria-modal="true">
		<div class={styles.backdrop} on:click={closeModal} />
		<!-- svelte-ignore a11y-autofocus -->
		<button shape="square" on:click={closeModal} autofocus>
			<Icon path={iconCancel} size="1.25rem" />
		</button>
		<div class={styles.contents}>
			<slot />
		</div>
	</div>
{/if}