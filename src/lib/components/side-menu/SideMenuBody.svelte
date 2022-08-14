<script>
	import styles from "./side-menu.module.css";

	export let show = false;
</script>

<section class={styles["menu-body"]} label="menu" class:show>
	<slot />
</section>
