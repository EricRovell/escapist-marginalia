<script lang="ts">
	import { spring } from "svelte/motion";
	import { Modal } from "@components";
	import { pannable, swipable } from "$lib/actions";
	import styles from "./image-fullscreen.module.css";

	export let open = false;

	const imageScale = spring(1, {
		stiffness: 0.15,
		damping: 0.4
	});

	const coords = spring({ x: 0, y: 0 }, {
		stiffness: 0.15,
		damping: 0.4
	});

	const close = () => {
		open = false;
		void coords.set({ x: 0, y: 0 });
		void imageScale.set(1);
	};

	function handlePanMove(e) {
		void coords.set(
			{	x: e.detail.x, y: e.detail.y },
			{ hard: !e.detail.spring }
		);
	}

	function handleZoom(e) {
		void imageScale.set(e.detail.scale, { hard: !e.detail.spring });
	}
</script>

<Modal {open} on:close={close}>
	<div
		use:pannable
		use:swipable={{ threshold: 200 }}
		class="{styles.container}"
		on:touchmove|preventDefault
		on:panmove={handlePanMove}
    on:zoomchange={handleZoom}
		on:swipe-down={() => {
			if ($imageScale === 1) {
				close();
			}
		}}
		style="transform: scale({$imageScale}) translate({$coords.x}px, {$coords.y}px)"
	>
		<slot />
	</div>
</Modal>
