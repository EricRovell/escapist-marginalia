<script lang="ts">
	import { Button, Range } from "@components";
	import { ChaosGame } from "../components";
	import { range } from "@utils/helpers";
	import { randInt, randItem } from "@utils/random";
	import styles from "./chaos-game-random-restriction.module.css";

	export let t: Record<string, string>;

	let n = 4;
	let last: number[] = [ 1 ];
	let penultimate: number[] = [ 3 ];

	const getRandomRestrictionRule = (n: number) => {
		const vertices = new Set(range(1, n));
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
<section class="wide {styles.wrapper}">
	<h3>{t.title}</h3>
	{#key [ last, penultimate, n ]}
		<ChaosGame
			height="{450}"
			points="{5000}"
			polygon="{n}"
			scale="{250}"
			distances="{[
				{ index: -1, values: last, forbidden: true },
				{ index: -2, values: penultimate, forbidden: true }
			]}"
			width="{450}"
		>
		<p>{t["next-randomly"]}:</p>
		<p>{renderRestrictionSet(last)} from <strong>{t["from-the-last"]}</strong>,</p>
		<p>{renderRestrictionSet(penultimate)} from <strong>{t["from-the-penultimate"]}</strong>.</p>
		</ChaosGame>
	{/key}
	<form class="{styles.form}" on:submit|preventDefault>
		<Range bind:value={n} min={3} max={10} output>
			{t["number-of-sides"]}
		</Range>
		<Button on:click={handleClick}>
			{t["random-chaos"]}
		</Button>
	</form>
</section>
