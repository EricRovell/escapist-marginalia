<script lang="ts">
	import { Pagination, Range } from "@components";
	import { ChaosGame } from "../components";
	import { subsets } from "../chaos/chaos.utils";
	import { range } from "@utils/helpers";
	import styles from "./chaos-restriction-subsets-demo.module.css";

	export let n = 3;
	export let perPage = 8;
	export let t: Record<string, string>;

	let currentPage = 1;

	$: items = subsets(range(1, n), false);
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
	<h3>{t["title"]}</h3>
	<div class="{styles.wrapper}">
		{#each items.slice(from, from + perPage) as subset}
			<ChaosGame
				points="{3500}"
				polygon="{n}"
				scale="{175}"
				pointSize="{1.5}"
				distances="{[
					{ index: -1, values: subset }
				]}"
				step="{{ value: 0.5, factor: true }}"
			>
				{`{ ${subset.map(i => i.toString()).join(", ")} }`}
			</ChaosGame>
		{/each}
	</div>
	<form class="{styles.form}" on:submit|preventDefault>
		<Pagination
			bind:current="{currentPage}"
			start="{1}"
			end="{pages}"
			ordinal
		/>
		<Range bind:value="{n}" min="{3}" max="{9}" output>
			{t["number-of-sides"]}
		</Range>
	</form>
</section>
