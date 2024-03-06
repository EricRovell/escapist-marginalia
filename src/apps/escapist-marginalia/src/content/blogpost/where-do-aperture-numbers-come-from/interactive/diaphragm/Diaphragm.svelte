<script lang="ts">
	import { getContext } from "svelte";
	import { InputRange } from "ui";

	import { Diaphragm } from "../../components";
	import type { Translation } from "../../translations/types";
	import styles from "./diaphragm.module.css";

	const t = getContext<Translation>("t");

	let angle = 45;
</script>

<!--
	Iris Diaphragm Mechanism Demonstration.
-->
<section class="wide interactive">
	<h3>{t.TITLE_DIAPHRAGM}</h3>
	<Diaphragm bind:angle />
	<form class="{styles.controls}">
		<InputRange bind:value={angle} min={45} max={85}>
			{t.DIAPHRAGM_ANGLE}
		</InputRange>
	</form>
</section>
