<script lang="ts">
	import { Range } from "@components";
	import styles from "./diaphragm.module.css";

	export let angle = -5;
	export let petals = 6;
</script>

<!--
	Source: https://codepen.io/Rplus/pen/pVNKmL
-->
<section class="wide">
	<div class="{styles["camera-aperture"]}" style="--diaphragm-size: {angle}deg; --diaphragm-petals: {petals};">
			<div class="{styles["blade-box"]}">
				{#each { length: petals } as _, i}
					<div class="{styles.blade}" style="--i: {i + 1}" />
				{/each}
			</div>
	</div>
	<form class="{styles.controls}">
		<Range bind:value={angle} min={-35} max={-5} />
	</form>
</section>
