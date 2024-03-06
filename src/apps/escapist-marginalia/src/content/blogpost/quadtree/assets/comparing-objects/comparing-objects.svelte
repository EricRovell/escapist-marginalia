<script lang="ts">
	import { getContext } from "svelte";
	import { InputSwitch } from "ui";

	import type { Translation } from "../../translations/types";
	import styles from "./comparing-objects.module.css";

	export let closest = false;

	const t = getContext<Translation>("t");
</script>

<div class="{styles.root}">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500">
		<g class="{styles.connection}">
			<line x1="219.48" y1="188.5" x2="307.18" y2="121.86"/>
			<line x1="219.48" y1="188.5" x2="289.82" y2="277.1"/>
			<line x1="219.48" y1="188.5" x2="122.01" y2="235.46"/>
			<line x1="219.48" y1="188.5" x2="164.71" y2="93.52"/>
			{#if !closest}
				<line x1="219.48" y1="188.5" x2="563.01" y2="121.86"/>
				<line x1="219.48" y1="188.5" x2="541.24" y2="333.95"/>
				<line x1="219.48" y1="188.5" x2="245.9" y2="444.33"/>
				<line x1="219.48" y1="188.5" x2="663.35" y2="223.73"/>
			{/if}
		</g>
		<g class="{styles.object}">
			{#if closest}
				<circle class="{styles["closest-area"]}" cx="219.48" cy="188.5" r="165"/>
			{/if}
			<circle class="current" cx="219.48" cy="188.5" r="32.17"/>
			<circle cx="307.18" cy="121.86" r="32.17"/>
			<circle cx="289.82" cy="277.1" r="32.17"/>
			<circle cx="122.01" cy="235.46" r="32.17"/>
			<circle cx="164.71" cy="93.52" r="32.17"/>
			<circle cx="563.01" cy="121.86" r="32.17"/>
			<circle cx="541.24" cy="333.95" r="32.17"/>
			<circle cx="245.9" cy="444.33" r="32.17"/>
			<circle cx="663.35" cy="223.73" r="32.17"/>
		</g>
	</svg>
	<form>
		<InputSwitch bind:checked="{closest}">
			{t.COMPARE_CLOSEST}
		</InputSwitch>
	</form>
</div>
