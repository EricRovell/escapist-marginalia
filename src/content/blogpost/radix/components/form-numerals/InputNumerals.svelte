<script lang="ts">
	import { radix as rx } from "@ericrovell/radix";
	import { InputText } from "@components";
	import { buildPattern, decoder } from "../../util";

	export let radix = 10;
	export let value = "";
	export let min = 0;
	export let max = 9999999;
	export let valid = true;

	$: pattern = buildPattern(radix);
</script>

<!--
	Numerals input, supports latin-letter based radix: 2 ... 36 -> 0 ... 9, A ... Z
	Case insensitive.
-->
<InputText
	bind:value
	bind:valid
	validators="{[
		(value) => ({
			valid: pattern && pattern.test(value),
			message: `Invalid numeral is used`
		}),
		(value) => {
			const decimal = rx(value.split(""), radix, { decode: decoder }).decimal;
			const valid = decimal >= min && decimal <= max;
			return {
				valid,
				message: `Value should be in range ${min} ... ${max}`
			};
		}
	]}"
>
	<slot />
</InputText>
