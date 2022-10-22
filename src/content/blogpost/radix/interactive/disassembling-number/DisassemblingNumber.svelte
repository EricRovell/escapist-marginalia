<script lang="ts">
	import { radix } from "@ericrovell/radix";
	import { InputNumber, Switch } from "@components";
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
<!-- 					<li class="{styles.rank}">
						{#if rank > 1}
							<span class="{styles["mult"]}">
								{rank}
							</span>
						{/if}
						<span>
							{#if power}
								{radixOutput}<sup>{numberOutput.getRanks().length - 1 - index}</sup>
							{:else}
								{radixOutput ** (numberOutput.getRanks().length - 1 - index)}
							{/if}
						</span>
					</li> -->
				{/if}
			{/each}
		</ol>
	</div>
	<form on:submit|preventDefault class="{styles.form}">
		<InputNumber bind:value="{inputNumber}" min="{0}" max="{100000}">
			{t.number}
		</InputNumber>
		<InputNumber bind:value="{radixOutput}" min="{2}" max="{64}">
			{t.radix}
		</InputNumber>
		<Switch bind:checked="{showPower}">
			{t.power}
		</Switch>
	</form>
</section>
