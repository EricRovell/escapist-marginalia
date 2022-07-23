<script lang="ts" context="module">
	import { range } from "@utils/helpers";

	const expressionInt = (stop: number) => `(\\sqrt{2})^${stop}`;
	const expressionFrac = (num: number, den: number) => `(\\sqrt{2})^{5\\frac{${num}}{${den}}}`;
</script>

<script lang="ts">
	import { MathExp } from "@components";

	/**
	 * range of fstops to display
	 */
	export let fstops: [ number, number ] = [ 0, 7 ];

	/**
	 * display a number of steps between {fstop} and {fstop + 1}
	 */
	export let fstop: number | undefined = undefined;
	export let steps = 0;
</script>

<table>
	<thead>
		<th>Fraction</th>
		<th>Computed</th>
		<th>F-stop</th>
	</thead>
	<tbody>
		{#if steps > 0}
			{#each range(0, steps) as fstopStep}
				{@const value = 2 ** (fstop / 2 + fstopStep / (2 * steps))}
				<tr>
					<td>
						<MathExp
							math={!(fstopStep === 0 || fstopStep == steps)
								? expressionFrac(fstopStep, steps)
								: (fstopStep == 0)
									? expressionInt(fstop)
									: expressionInt(fstop + 1)
							}
							inline
						/>
					</td>
					<td>
						{value.toPrecision(4)}
					</td>
					<td>
						<MathExp math={`f/${value.toPrecision(2)}`} inline />
					</td>
				</tr>
			{/each}
		{:else}
			{#each range(...fstops) as fstop}
				<tr>
					<td>
						<MathExp
							math={`(\\sqrt{2})^${fstop}`}
							inline
						/>
					</td>
					<td>
						{(2 ** (fstop / 2)).toPrecision(4)}
					</td>
					<td>
						<MathExp
							math={`f/${Math.trunc((2 ** (fstop / 2)) * 10) / 10}`}
							inline
						/>
					</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>