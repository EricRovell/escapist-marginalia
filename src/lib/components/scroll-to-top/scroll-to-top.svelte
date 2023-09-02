<script lang="ts">
	import { Link } from "../link";
	import { Icon } from "../svg";
	import { iconArrowTop } from "@icons";
	import styles from "./scroll-to-top.module.css";

	export let id: string;
	export let label = "Scroll to top";
</script>

<!--
	Component reference: https://moderncss.dev/pure-css-smooth-scroll-back-to-top/
	
	Drawback: should not be used on short viewport as
	the `overflow: hidden` breaks the `sticky` behaviour.
-->
<div class="{styles.wrapper}">
	<Link
		className="{styles.link}"
		href="#{id}"
		{label}
	>
		<Icon
			path="{iconArrowTop}"
		/>
	</Link>
</div>
