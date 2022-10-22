<script lang="ts">
	import { radix } from "@ericrovell/radix";
	import { InputNumber, InputText, MathExp } from "@components";
	import styles from "./number-into-decimal.module.css";

	export let radixInput = 2;
	export let inputNumber = "10010";
	export let t: Record<string, string>;

	$: number = radix(inputNumber.split(""), radixInput);
	$: numberOutput = number.setRadix(10);
</script>

<!--
	Disassembling the number into radix powers demonstration.
-->
<section class="wide interactive {styles.wrapper}">
	<h4>{t.title}</h4>
	{#if number.valid}
		<div class="{styles["number-wrapper"]}">
			<output class="{styles.number}">
				{number.toString()}<sub>{radixInput}</sub>
			</output>
			<MathExp math={String.raw`\to`} />
			<output class="{styles.number}">
				{numberOutput.decimal}<sub>10</sub>
			</output>
		</div>
		<div class="{styles["ranks-wrapper"]}">
			<ol class="{styles.ranks}">
				{#each [ ...number ] as [ rank, power ] (`${power}/${rank}`)}
					<li class="{styles.rank}" class:zero={rank === 0}>
						<span class="{styles["mult"]}">
							{rank}
						</span>
						<span>
							{radixInput}<sup>{power}</sup>
						</span>
					</li>
				{/each}
			</ol>
		</div>
	{/if}
	<form on:submit|preventDefault class="{styles.form}">
		<InputText bind:value="{inputNumber}" pattern="[0-{radixInput - 1}]+" maxlength="{16}">
			{t.number}
		</InputText>
		<InputNumber bind:value="{radixInput}" min="{2}" max="{64}">
			{t.radix}
		</InputNumber>
	</form>
</section>
