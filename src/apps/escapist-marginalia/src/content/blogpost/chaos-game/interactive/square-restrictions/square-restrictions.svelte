<script lang="ts">
	import { getContext } from "svelte";

	import { ChaosGame } from "../../components/chaos-game";
	import type { Translation } from "../../translations/types";
	import styles from "./square-restrictions.module.css";

	const t = getContext<Translation>("t");

	const items = [
		{ index: -1, values: [ 1, 2, 3 ] },
		{ index: -1, values: [ 1, 2, 4 ] },
		{ index: -1, values: [ 1, 3, 4 ] }
	];
</script>

<section class="wide interactive">
	<h3>{t.TITLE_SQUARE_RESTRICTIONS_DEMONSTRATION}</h3>
	<div class="{styles.wrapper}">
		{#each items as restriction, i}
			<ChaosGame
				id="square-restrictions-demo"
				options={{
					"points-scale": 0.75,
					"points-limit": 7500,
					"polygon-sides": 4,
					"polygon-visible": false,
					"restrictions": [ restriction ]
				}}
			>
				{t.RULES[i]}
			</ChaosGame>
		{/each}
	</div>
</section>
