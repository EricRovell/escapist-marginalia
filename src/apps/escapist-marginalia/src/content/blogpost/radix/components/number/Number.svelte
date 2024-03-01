<script lang="ts">
	import styles from "./number.module.css";

	export let number: number | string;
	export let radix: number;
</script>

<output class="{styles.number}">
	{number}<sub>{radix}</sub>
</output>
