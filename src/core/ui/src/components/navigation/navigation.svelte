<script lang="ts">
	import styles from "./navigation.module.css";

	export let className = "";
</script>

<nav class="{styles.navigation} {className}">
	<ul class="{styles.items}">
		<slot />
	</ul>
</nav>
