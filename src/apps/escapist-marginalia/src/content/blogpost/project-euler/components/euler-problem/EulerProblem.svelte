<script lang="ts">
	import { Link } from "ui";

	import styles from "./euler-problem.module.css";

	export let problem: number;
</script>

<article class="{styles["euler-problem"]} card">
	<section>
		<slot />
	</section>
	<footer>
		<Link href={`https://projecteuler.net/problem=${problem}`}>
			Problem #{problem}
		</Link>
	</footer>
</article>
