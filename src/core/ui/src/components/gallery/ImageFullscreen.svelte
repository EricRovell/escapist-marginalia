<script lang="ts">
	import { spring } from "svelte/motion";
	import { Modal } from "../modal";
	import { pannable, swipable } from "../../actions";
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

	const handlePanMove = (event: CustomEvent) => {
		void coords.set(
			{	x: event.detail.x, y: event.detail.y },
			{ hard: !event.detail.spring }
		);
	};

	const handleZoom = (event: CustomEvent) => {
		void imageScale.set(event.detail.scale, { hard: !event.detail.spring });
	};
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
