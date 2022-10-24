<script lang="ts">
	import { radix } from "@ericrovell/radix";
	import { Switch } from "@components";
	import { FormNumerals } from "../../components";
	import styles from "./disassembling-number.module.css";

	export let radixOutput = 10;
	export let inputNumber = 1234;
	export let showPower = false;
	export let t: Record<string, string>;

	$: number = radix(inputNumber, 10);
	$: numberOutput = number.setRadix(radixOutput);
</script>

<!--
	Disassembling the number into radix powers demonstration.
-->
<section class="wide interactive {styles.wrapper}">
	<h4>{t.title}</h4>
	<output class="{styles.number}">
		{number}<sub>{radixOutput}</sub>
	</output>
	<div class="{styles["ranks-wrapper"]}">
		<ol class="{styles.ranks}">
			{#each [ ...numberOutput ] as [ rank, power ] (`${power}/${rank}`)}
				{#if rank}
					<li class="{styles.rank}">
						{#if rank > 1}
							<span class="{styles["mult"]}">
								{rank}
							</span>
						{/if}
						<span>
							{#if showPower}
								{radixOutput}<sup>{power}</sup>
							{:else}
								{radixOutput ** power}
							{/if}
						</span>
					</li>
				{/if}
			{/each}
		</ol>
	</div>
	<FormNumerals
		bind:number="{inputNumber}"
		bind:radix="{radixOutput}"
		{t}
	>
		<Switch bind:checked="{showPower}">
			{t.power}
		</Switch>
	</FormNumerals>
</section>
