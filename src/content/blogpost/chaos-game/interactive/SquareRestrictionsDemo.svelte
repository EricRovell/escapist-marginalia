<script>
	import { ChaosGame } from "../components";
	import styles from "./square-restrictions-demo.module.css";

	export let t;

	const items = [
		{ index: -1, values: [ 1, 2, 3 ] },
		{ index: -1, values: [ 1, 2, 4 ] },
		{ index: -1, values: [ 1, 3, 4 ] }
	];
</script>

<section class="wide">
	<h3>{t["title"]}</h3>
	<div class="{styles.wrapper}">
		{#each items as restriction, i}
			<ChaosGame
				points="{2500}"
				polygon="{4}"
				scale="{200}"
				pointSize="{0.75}"
				distances="{[ restriction ]}"
			>
				{t["rules"][i]}
			</ChaosGame>
		{/each}
	</div>
</section>
