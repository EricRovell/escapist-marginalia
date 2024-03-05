<script lang="ts">
	import { Link } from "../link";
	import { current } from "../../actions";
	import styles from "./navigation.module.css";

	export let href = "";
	export let disabled = false;
	export let pathname: string = "";
	export let pattern: RegExp | null = null;
</script>

<li
	class="{styles.item}"
	use:current="{{ pathname, pattern }}"
>
	<Link {href} {disabled}>
		<slot />
	</Link>
</li>
