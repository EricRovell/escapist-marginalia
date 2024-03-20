<script lang="ts">
	import { subsets } from "chaos-game";
	import { InputRange, Pagination } from "ui";
	import { range } from "utils/math";
	import { getContext } from "svelte";

	import { ChaosGame } from "../../components/chaos-game";
	import type { Translation } from "../../translations/types";
	import styles from "./restriction-subsets.module.css";

	export let n = 3;
	export let perPage = 8;

	const t = getContext<Translation>("t");

	let currentPage = 1;

	$: items = subsets(Array.from(range(1, n + 1)), false);
	$: pages = Math.ceil(((n ** 2) - 1) / perPage);
	$: from = (currentPage - 1) * perPage;

	$: {
		/**
		 * reset pagination on "n" change
		 * as different polygons have different number of combinations
		*/
		n;
		currentPage = 1;
	}
</script>

<!--
	Chaos Game restriction subsets demo:

	Generates all possible subsets of restrictions.
	As there are many of them and rendering so much would be
	bad for performance, the pagination is used.
-->
<section class="wide interactive">
	<h3>{t.TITLE_RESTRICTIONS_SUBSET}</h3>
	<div class="{styles.wrapper}">
		{#key currentPage}
			{#each items.slice(from, from + perPage) as subset}
				<ChaosGame
					id="chaos-game-restriction-subsets"
					options={{
						"points-limit": 4500,
						"polygon-sides": n,
						"polygon-visible": false,
						"restrictions": [{ index: -1, values: subset }]
					}}
				>
					{`{ ${subset.map(i => i.toString()).join(", ")} }`}
				</ChaosGame>
			{/each}
		{/key}
	</div>
	<form class="{styles.form}" on:submit|preventDefault>
		<Pagination
			bind:current="{currentPage}"
			start="{1}"
			end="{pages}"
			ordinal
		/>
		<InputRange bind:value="{n}" min="{3}" max="{9}" output>
			{t.NUMBER_OF_SIDES}
		</InputRange>
	</form>
</section>
