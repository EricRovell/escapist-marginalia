<script>
	import styles from "./timeline.module.css";
</script>

<section class={styles["timeline-section"]}>
	<header>
		<slot name="header" />
	</header>
	<ol>
		<slot />
	</ol>
</section>