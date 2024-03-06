<script lang="ts">
	import { radix as rx } from "@ericrovell/radix";
	import { InputText } from "ui";

	import { buildPattern, decoder } from "../../util";

	export let radix = 10;
	export let value = "";
	export let min = 0;
	export let max = 9999999;
	export let valid = true;

	const VALIDATORS = [
		(value: string) => ({
			valid: pattern && pattern.test(value),
			message: "Invalid numeral is used"
		}),
		(value: string) => {
			const decimal = rx(value.split(""), radix, { decode: decoder }).decimal;
			const valid = decimal >= min && decimal <= max;
			return {
				valid,
				message: `Value should be in range ${min} ... ${max}`
			};
		}
	];

	$: pattern = buildPattern(radix);
</script>

<!--
	Numerals input, supports latin-letter based radix: 2 ... 36 -> 0 ... 9, A ... Z
	Case insensitive.
-->
<InputText
	bind:value
	bind:valid
	validators="{VALIDATORS}"
>
	<slot />
</InputText>
