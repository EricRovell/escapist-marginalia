<script lang="ts">
	import { getContext } from "svelte";
	import { range } from "utils/math";

	import FNumber, { type FStop } from "./f-number.svelte";
	import type { Translation } from "../../translations/types";
	import styles from "./f-numbers.module.css";

	const t = getContext<Translation>("t");

	/**
	 * range of fstops to display
	 */
	export let fstopFrom = 0;
	export let fstopTo = 7;

	/**
	 * display a number of steps between {fstop} and {fstop + 1}
	 */
	export let step = 1;

	const rows: FStop[] = [ "F_NUMBER", "VALUE", "PROGRESSION" ];

	/**
	 * number of columns: header + f-numbers + steps in between
	 */
	$: items = fstopTo - fstopFrom + 1 + ((step > 1) ? (fstopTo - fstopFrom) * (step - 1) : 0) + 1;
	$: fstops = Array.from(range(fstopFrom, fstopTo + 1));
	$: intermediate = step > 1;
</script>

<article class="custom-scroll {styles.wrapper}" style:--f-number-items={items}>
	{#each rows as type}
		<section>
			<header>{t[type]}</header>
			<ol class="">
				{#each fstops as fstop}
					<li class="{styles.item} {styles[type]}">
						<FNumber {type} {fstop} />
					</li>
					{#if intermediate && fstop < fstopTo}
						{#each Array.from(range(1, step)) as fstopStep}
							<li class="{styles.item} {styles[type]}" class:intermediate>
								<FNumber {type} {fstop} step={[ fstopStep, step ]} />
							</li>
						{/each}
					{/if}
				{/each}
			</ol>
		</section>
	{/each}
</article>
