<script lang="ts" context="module">
	import { Button, MathExp, Range } from "@components";
	import { clamp, range } from "@utils/helpers";
</script>

<script lang="ts">
	import styles from "./f-numbers.module.css";

	export let dict: Record<string, string>;

	/**
	 * range of fstops to display
	 */
	export let fstops: [ number, number ] = [ 0, 7 ];
	const fstopMin = 0;
	const fstopMax = 12;

	/**
	 * display a number of steps between {fstop} and {fstop + 1}
	 */
	export let step = 1;

	export let fstopsControls = false;
	export let stepControls = false;
	
	/**
	 * header + f-numbers + steps in between
	 */
	$: items = fstops[1] - fstops[0] + 1 + ((step > 1) ? (fstops[1] - fstops[0]) * (step - 1) : 0) + 1;

	const handleStopChange = (inc: number) => {
		fstops = [
			clamp(fstops[0] + inc, fstopMin, fstopMax - 1),
			clamp(fstops[1] + inc, fstopMin + 1, fstopMax)
		];
	};
</script>

<section class="custom-scroll wide {styles.root}" style:--f-number-items={items}>
	<form on:submit|preventDefault class:step-controls={stepControls}>
		{#if fstopsControls}
			<Range bind:value={fstops[1]} min={fstopMin + 1} max={fstopMax}>
				{dict["f-numbers"]}
			</Range>
		{/if}
		{#if stepControls}
			<Button
				on:click={() => handleStopChange(-1)}
				disabled={fstops[0] === fstopMin}
			>
				{dict["prev-f-stop"]}
			</Button>
			<Button
				on:click={() => handleStopChange(1)}
				disabled={fstops[1] === fstopMax}
			>
				{dict["next-f-stop"]}
			</Button>
			<Range bind:value={step} min={1} max={7}>
				{dict["step"]}
			</Range>
		{/if}
	</form>
	<article>
		<section class="{styles["f-numbers"]}">
			<ol class="">
				<header>
					{dict["f-number"]}
				</header>
				{#each range(...fstops) as fstop}
					<li class="{styles.item} {styles["f-number"]}">
						{Math.trunc((2 ** (fstop / 2)) * 10) / 10}
					</li>
					{#if step > 1 && fstop < fstops[1]}
						{#each range(2, step) as fstopStep}
							{@const value = 2 ** (fstop / 2 + (fstopStep - 1) / (2 * step))}
							<li class="{styles.item} {styles["f-number-intermidiate"]}">
								{value.toPrecision(2)}
							</li>
						{/each}
					{/if}
				{/each}
			</ol>
		</section>
		<section class="{styles.calculated}">
			<ol class="">
				<header>
					{dict["calculated"]}
				</header>
				{#each range(...fstops) as fstop}
					<li class="{styles.item}">
						{(2 ** (fstop / 2)).toPrecision(4)}
					</li>
					{#if step > 1 && fstop < fstops[1]}
						{#each range(2, step) as fstopStep}
							{@const value = 2 ** (fstop / 2 + (fstopStep - 1) / (2 * step))}
							<li class="{styles.item}">
								{value.toPrecision(4)}
							</li>
						{/each}
					{/if}
				{/each}			
			</ol>
		</section>
		<section class="{styles.progression}">
			<ol class="">
				<header>
					{dict["progression"]}
				</header>
				{#each range(...fstops) as fstop}
					<li class="{styles.item}">
						<MathExp math={`(\\sqrt{2})^{${fstop}}`} inline />
					</li>
					{#if step > 1 && fstop < fstops[1]}
						{#each range(2, step) as fstopStep}
							<li class="{styles.item}">
								<MathExp math={`(\\sqrt{2})^{${fstop}\\frac{${fstopStep - 1}}{${step}}}`} inline />
							</li>
						{/each}
					{/if}
				{/each}
			</ol>
		</section>
	</article>
</section>
