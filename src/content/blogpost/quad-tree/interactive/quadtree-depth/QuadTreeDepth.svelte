<script lang="ts">
	import { Range } from "@components";
	import { QuadTreeGrid } from "../../components";

	export let depth = 1;

	const TREE_DEPTH_MAX = 5;

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
	<QuadTreeGrid
		bounds="{getBounds(depth)}"
	/>
	<form>
		<Range
			bind:value="{depth}"
			min="{1}"
			max="{TREE_DEPTH_MAX}"
			output
		>
			Depth
		</Range>
	</form>
</section>
