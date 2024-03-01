<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { Button, Icon } from "@components";
	import { generateIndexes } from "./pagination.helpers";
	import styles from "./pagination.module.css";

	export let current: number;
	export let start: number;
	export let end: number;
	export let ordinal = false;
	export let vertical = false;
	export let limit = 7;
	export let siblings = 1;

	const path = "M19.56,24a.89.89,0,0,1-.63-.26L11.8,16.65a.92.92,0,0,1,0-1.27h0l7.13-7.16A.9.9,0,0,1,20.2,9.48L13.69,16l6.51,6.5a.91.91,0,0,1,0,1.26h0A.9.9,0,0,1,19.56,24Z";

	const dispatch = createEventDispatcher();

	// Too many items -> should be ordinal for accessibility and responsiveness
	$: ordinal = end - start + 1 > limit || ordinal;
	$: indices = generateIndexes({ current, start, end, limit, siblings });

	const handleClick = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (target.nodeName === "BUTTON") {
			const index = target.dataset.index;
			if (index) {
				dispatch("navigate", target.dataset.index);
				current = Number(target.dataset.index);
			}
		}
	};
</script>

<nav class="{styles.pagination}" class:vertical aria-label="pagination" on:click={handleClick} role="presentation">
	<Button
		appearance="outline"
		className="{styles["pagination-item"]} {styles.arrow}"
		data-index={current - 1}
		disabled={current <= start}
	>
		<Icon {path} viewBox="0 0 32 32" />
	</Button>
	{#each indices as item}
		{@const active = current === item}
		{@const contents = item < 0 ? "…" : item}
		{@const ellipsis = item < 0}
		<Button
			appearance="{active ? "fill" : "outline"}"
			aria-current={active ? "true" : undefined}
			className="{styles["pagination-item"]} {ellipsis ? "ellipsis" : ""} {ordinal ? "ordinal" : ""}"
			data-index={ellipsis ? undefined : item}
			disabled={ellipsis}
		>
			{ordinal ? contents : ""}
		</Button>
		<!-- <button
			aria-current={active ? "true" : undefined}
			class={styles["pagination-item"]}
			class:ellipsis
			class:ordinal
			data-index={ellipsis ? undefined : item}
			disabled={ellipsis}
		>
			{ordinal ? contents : ""}
		</button> -->
	{/each}
	<Button
		appearance="outline"
		className="{styles["pagination-item"]} {styles.arrow}"
		data-index={current + 1}
		disabled={current >= end}
	>
		<Icon {path} viewBox="0 0 32 32" />
	</Button>
</nav>
