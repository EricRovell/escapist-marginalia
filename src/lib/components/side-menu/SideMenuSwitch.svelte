<script>
	import { Button } from "../button";
	import styles from "./side-menu.module.css";
	import stylesIcon from "./side-menu-switch.module.css";

	export let show = false;
</script>

<Button on:click className={styles["menu-switch"]}>
	<div class={stylesIcon["menu-switch-icon"]} class:show>
		<span />
		<span />
		<span />
	</div>
	<slot />
</Button>