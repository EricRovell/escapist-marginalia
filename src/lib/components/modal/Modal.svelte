<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { fade } from "svelte/transition";
	import { portal, shortcut } from "@lib/actions";
	import Icon from "../icons/Icon.svelte";
	import { iconCancel } from "../icons/default";
	import { preventPageScroll } from "@utils/helpers";
	import styles from "./modal.module.css";

	export let open = false;

	const dispatch = createEventDispatcher();

	const closeModal = () => {
		open = false;
		dispatch("close");
	};
	
	$: preventPageScroll(open);
</script>

{#if open}
	<div
		aria-modal="true"
		class={styles.modal}
		hidden
		in:fade
		out:fade
		role="dialog"
		use:portal
		use:shortcut={{
			active: open,
			code: "Escape",
			callback: closeModal
		}}
	>
		<div class={styles.backdrop} on:click={closeModal} />
		<!-- svelte-ignore a11y-autofocus -->
		<button shape="square" on:click={closeModal} autofocus>
			<Icon path={iconCancel} />
		</button>
		<div class={styles.contents}>
			<slot />
		</div>
	</div>
{/if}