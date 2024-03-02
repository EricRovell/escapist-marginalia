<script lang="ts">
	import { getContext } from "svelte";
	import { range } from "utils/math";
	import { randInt, randItem } from "utils/random";

	import { Button, Range } from "@components";
	import { ChaosGame } from "../../components/chaos-game";
	import styles from "./chaos-game-random-restriction.module.css";

	const t = getContext<Record<string, string>>("t")["random-restrictions"];

	let n = 4;
	let last: number[] = [ 1 ];
	let penultimate: number[] = [ 3 ];

	const getRandomRestrictionRule = (n: number) => {
		const vertices = new Set(range(1, n + 1));
		const rule = [];

		for (let i = 0; i < randInt(1, n); i++) {
			const [ item ] = randItem(Array.from(vertices));
			rule.push(item);
			vertices.delete(item);
		}

		return rule;
	};

	const handleClick = () => {
		last = getRandomRestrictionRule(n);
		penultimate = getRandomRestrictionRule(n);
	};

	const renderRestrictionSet = (value: number[]) => {
		return `{ ${value.map(i => i.toString()).join(", ")} }`;
	};
</script>

<!--
	Chaos Game Random Restriction Rules Generator.

	As the are too many possibilities when more than one lasly used vertice is restrictied,
	this demonstration just generates random ones.
-->
<section class="wide {styles.wrapper} interactive">
	<h3>{t.title}</h3>
	<ChaosGame
		id="chaos-game-random-restriction"
		options={{
			"points-limit": 12000,
			"polygon-sides": n,
			"polygon-visible": false,
			"restrictions": [
				{ index: -1, values: last, forbidden: true },
				{ index: -2, values: penultimate, forbidden: true }
			]
		}}
		height="{450}"
		width="{450}"
	>
	<p>{t["next-randomly"]}:</p>
	<p><span>{renderRestrictionSet(last)}</span> from <strong>{t["from-the-last"]}</strong>,</p>
	<p><span>{renderRestrictionSet(penultimate)}</span> from <strong>{t["from-the-penultimate"]}</strong>.</p>
	</ChaosGame>
	<form class="{styles.form}" on:submit|preventDefault>
		<Range bind:value={n} min={3} max={10} output>
			{t["number-of-sides"]}
		</Range>
		<Button on:click={handleClick}>
			{t["random-chaos"]}
		</Button>
	</form>
</section>
