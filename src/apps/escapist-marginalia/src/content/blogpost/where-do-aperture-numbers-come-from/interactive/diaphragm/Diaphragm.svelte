<script lang="ts">
	import { getContext } from "svelte";
	import { InputRange } from "ui";

	import { Diaphragm } from "../../components";
	import styles from "./diaphragm.module.css";

	const t: Record<string, string> = getContext("t")["diaphragm"];

	let angle = 45;
</script>

<!--
	Iris Diaphragm Mechanism Demonstration.
-->
<section class="wide interactive">
	<h3>{t["title"]}</h3>
	<Diaphragm bind:angle />
	<form class="{styles.controls}">
		<InputRange bind:value={angle} min={45} max={85}>
			{t["angle"]}
		</InputRange>
	</form>
</section>
