<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { fade } from "svelte/transition";
	import { portal, shortcut } from "@lib/actions";
	import { Icon } from "../svg";
	import { iconCancel } from "../icons/default";
	import { preventPageScroll } from "@utils/helpers";
	import styles from "./modal.module.css";

	export let className = "";
	export let open = false;

	const dispatch = createEventDispatcher();

	const closeModal = () => {
		open = false;
		dispatch("close");
	};

	$: preventPageScroll(open);
	$: {
		if (globalThis.window) {
			const root = document.querySelector("#app");
			open
				? root.setAttribute("inert", "inert")
				: root.removeAttribute("inert");
		}
	}
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
		<div
			class={styles.backdrop}
			on:click={closeModal}
			role="presentation"
		/>
		<button on:click={closeModal}>
			<Icon path={iconCancel} />
		</button>
		<div class="{styles.contents} {className}">
			<slot />
		</div>
	</div>
{/if}
