<script lang="ts">
	import { Range } from "@components";
	import { Diaphragm } from "../components";
	import styles from "./diaphragm.module.css";

	export let t: Record<string, string>;

	let angle = 45;
</script>

<!--
	Iris Diaphragm Mechanism Demonstration.
-->
<section class="wide">
	<h3>{t["title"]}</h3>
	<Diaphragm bind:angle />
	<form class="{styles.controls}">
		<Range bind:value={angle} min={45} max={85}>
			{t["angle"]}
		</Range>
	</form>
</section>
