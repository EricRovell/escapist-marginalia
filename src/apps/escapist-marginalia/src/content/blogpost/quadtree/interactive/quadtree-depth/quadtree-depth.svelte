<script lang="ts">
	import { getContext } from "svelte";
	import { InputRange } from "ui";

	import { QuadTreeGrid } from "../../components";
	import type { Translation } from "../../translations/types";

	export let depth = 1;

	const TREE_DEPTH_MAX = 5;
	const t = getContext<Translation>("t");

	const getBounds = (depth: number) => {
		const bounds = [];
		const rows = 2 ** depth - 1;
		const scale = 1000 / (2 ** (depth - 1));

		for (let x = 0; x < rows; x++) {
			for (let y = 0; y < rows; y++) {
				bounds.push({
					x: x * scale,
					y: y * scale,
					width: scale,
					height: scale
				});
			}
		}

		return bounds;
	};
</script>

<section class="interactive wide">
	<h3>{t.TITLE_DEPTH}</h3>
	<QuadTreeGrid
		bounds="{getBounds(depth)}"
	/>
	<form>
		<InputRange
			bind:value="{depth}"
			min="{1}"
			max="{TREE_DEPTH_MAX}"
			output
		>
			{t.DEPTH}
		</InputRange>
	</form>
</section>
