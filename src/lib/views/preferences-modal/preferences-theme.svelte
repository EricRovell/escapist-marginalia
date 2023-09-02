<script lang="ts" context="module">
	export type Theme = "auto" | "light" | "dark";
</script>

<script lang="ts">
	import { theme } from "@stores";
	import * as Radio from "../../components/radio";
	import Icon from "../../components/icons/Icon.svelte";
	import { iconMoon, iconSun, iconSunset } from "../../components/icons/default";

	const options = [
		{
			icon: iconSun,
			label: "Light",
			value: "light",
			checked: $theme.type === "user" && $theme.value === "light"
		},
		{
			icon: iconSunset,
			label: "System",
			value: "system",
			checked: $theme.type === "system"
		},
		{
			icon: iconMoon,
			label: "Dark",
			value: "dark",
			checked: $theme.type === "user" && $theme.value === "dark"
		}
	];

	const handleChange = (event: InputEvent) => {
		const target = event.target as HTMLInputElement;
		const value = target.value;
		theme.set(value);
	};
</script>

<Radio.Group
	name="theme"
	on:change={handleChange}
>
	<h4 slot="title">
		Theme
	</h4>
	{#each options as { checked, icon, label, value }}
		<Radio.Button
			{value}
			checked={checked}
		>
			<Icon path="{icon}" /> {label}
		</Radio.Button>
	{/each}
</Radio.Group>
